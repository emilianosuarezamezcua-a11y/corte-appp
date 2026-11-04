'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const WELCOME = 'Hi! I am the Corte App guide. I can help you find the right plan in 3 quick questions.';

const QUESTIONS = [
  {
    key: 'business_type',
    text: 'Question 1 of 3: What type of business do you have?',
    options: ['Street stand', 'Small restaurant', 'Other'],
  },
  {
    key: 'tracking_method',
    text: 'Question 2 of 3: How do you track your money today?',
    options: ['Paper notebook', 'Phone notes or spreadsheet', 'I do not track it'],
  },
  {
    key: 'main_problem',
    text: 'Question 3 of 3: What is your biggest problem?',
    options: [
      'I do not know my profit',
      'I forget to write my expenses',
      'It takes me too much time',
    ],
  },
];

const GUARDRAIL_WORDS = [
  'tax',
  'legal',
  'lawyer',
  'lawsuit',
  'loan',
  'password',
  'card number',
  'credit card',
  'debit card',
  'cvv',
];

const GUARDRAIL_REPLY =
  'I cannot help with taxes, legal advice, loans, passwords, or card numbers. Please talk to a professional for those topics. I can help with prices, profit, expenses, and how the app works.';

function isGuardrail(text) {
  const lower = text.toLowerCase();
  for (let i = 0; i < GUARDRAIL_WORDS.length; i++) {
    if (lower.indexOf(GUARDRAIL_WORDS[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function hasAny(text, words) {
  for (let i = 0; i < words.length; i++) {
    if (text.indexOf(words[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function getReply(text) {
  const lower = text.toLowerCase();

  if (hasAny(lower, ['price', 'plan', 'how much', 'pay'])) {
    return 'Corte App has 3 plans: Free, Growth at $99 MXN per month, and Pro at $199 MXN per month.';
  }
  if (hasAny(lower, ['profit', 'earn', 'gain'])) {
    return 'Profit is what you sell minus what you spend. Corte App does this math for you every day.';
  }
  if (hasAny(lower, ['expense', 'spend', 'spent', 'cost'])) {
    return 'Write each expense with an amount and a short note. Corte App subtracts it from your sales to show your profit.';
  }
  if (hasAny(lower, ['how', 'work', 'app', 'use'])) {
    return 'You write your sales and expenses during the day. At the end of the day you do a cut and see your profit.';
  }
  return 'I am not sure about that one. I can answer questions about price, profit, expenses, and how the app works.';
}

function getPlan(answers) {
  if (answers.business_type === 'Street stand') {
    return 'Growth';
  }
  if (answers.business_type === 'Small restaurant') {
    return 'Pro';
  }
  return 'Free';
}

function getRecommendation(answers) {
  const plan = getPlan(answers);
  let price = 'free';
  if (plan === 'Growth') {
    price = '$99 MXN per month';
  } else if (plan === 'Pro') {
    price = '$199 MXN per month';
  }

  let tip = 'Tip: Do one quick cut at the end of the day instead of many notes.';
  if (answers.main_problem === 'I do not know my profit') {
    tip = 'Tip: Write every sale and every expense each day. Corte App shows your profit at the end of the day.';
  } else if (answers.main_problem === 'I forget to write my expenses') {
    tip = 'Tip: Write each expense right when you pay it, even the small ones.';
  }

  return 'Based on your answers, I recommend the ' + plan + ' plan (' + price + '). ' + tip;
}

function ChatBubble(props) {
  const isUser = props.role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isUser
            ? 'max-w-[80%] rounded-lg px-4 py-2 text-sm bg-gray-900 text-white'
            : 'max-w-[80%] rounded-lg px-4 py-2 text-sm bg-white border border-gray-200 text-gray-900'
        }
      >
        {props.text}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: WELCOME }]);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [guardrailSeen, setGuardrailSeen] = useState(false);
  const [humanRequested, setHumanRequested] = useState(false);

  function handleStart() {
    setStarted(true);
    setMessages(
      messages.concat([
        { role: 'user', text: 'Start' },
        { role: 'assistant', text: QUESTIONS[0].text },
      ])
    );
  }

  async function saveNewSession(finalAnswers) {
    const result = await supabase
      .from('chat_sessions')
      .insert({
        business_type: finalAnswers.business_type,
        tracking_method: finalAnswers.tracking_method,
        main_problem: finalAnswers.main_problem,
        recommended_plan: getPlan(finalAnswers),
      })
      .select('id')
      .single();

    if (result.error || !result.data) {
      setMessages(function (prev) {
        return prev.concat([
          {
            role: 'assistant',
            text: 'Note: I could not save this chat, but you can keep using it.',
          },
        ]);
      });
    } else {
      setSessionId(result.data.id);
    }
  }

  async function updateSession(fields) {
    if (!sessionId) {
      return;
    }
    await supabase.from('chat_sessions').update(fields).eq('id', sessionId);
  }

  function handleAnswer(option) {
    const current = QUESTIONS[step];
    const newAnswers = Object.assign({}, answers);
    newAnswers[current.key] = option;
    setAnswers(newAnswers);

    const newMessages = messages.concat([{ role: 'user', text: option }]);
    const nextStep = step + 1;
    const finished = nextStep >= QUESTIONS.length;

    if (!finished) {
      newMessages.push({ role: 'assistant', text: QUESTIONS[nextStep].text });
    } else {
      newMessages.push({ role: 'assistant', text: getRecommendation(newAnswers) });
      newMessages.push({
        role: 'assistant',
        text: 'You can now ask me a question about price, profit, expenses, or how the app works.',
      });
    }

    setMessages(newMessages);
    setStep(nextStep);

    if (finished) {
      saveNewSession(newAnswers);
    }
  }

  function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) {
      return;
    }

    let reply = '';
    let triggered = guardrailSeen;
    if (isGuardrail(text)) {
      reply = GUARDRAIL_REPLY;
      triggered = true;
      setGuardrailSeen(true);
    } else {
      reply = getReply(text);
    }

    setMessages(
      messages.concat([
        { role: 'user', text: text },
        { role: 'assistant', text: reply },
      ])
    );
    setInput('');

    updateSession({ last_question: text, guardrail_triggered: triggered });
  }

  function handleHuman() {
    if (humanRequested) {
      return;
    }
    setHumanRequested(true);

    let reply = 'Done. I marked this chat so Emiliano can review it.';
    if (!sessionId) {
      reply = 'I could not mark this chat because it was not saved.';
    }

    setMessages(
      messages.concat([
        { role: 'user', text: 'Ask Emiliano to review this' },
        { role: 'assistant', text: reply },
      ])
    );

    updateSession({ needs_human: true });
  }

  const showOptions = started && step < QUESTIONS.length;
  const showInput = started && step >= QUESTIONS.length;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Corte App guide</h1>
      <p className="text-gray-600 mb-4">
        Answer a few quick questions and get a plan that fits your business.
      </p>
      <p className="text-xs text-gray-500 mb-2">
        Fixed-rule assistant, not a live AI. It follows set rules and does not use an AI model.
      </p>
      <p className="text-xs text-gray-500 mb-6">
        Your answers are saved to test this app. Please do not type personal information.
      </p>

      <div
        className="space-y-3 border border-gray-200 rounded-lg bg-gray-50 p-4 mb-4"
        role="log"
        aria-live="polite"
      >
        {messages.map(function (m, i) {
          return <ChatBubble key={i} role={m.role} text={m.text} />;
        })}
      </div>

      {!started ? (
        <button
          onClick={handleStart}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm"
        >
          Start
        </button>
      ) : null}

      {showOptions ? (
        <div className="flex flex-wrap gap-2">
          {QUESTIONS[step].options.map(function (option) {
            return (
              <button
                key={option}
                onClick={function () {
                  handleAnswer(option);
                }}
                className="border border-gray-300 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      {showInput ? (
        <div>
          <form onSubmit={handleSend} className="flex gap-2 mb-3">
            <input
              type="text"
              value={input}
              onChange={function (e) {
                setInput(e.target.value);
              }}
              placeholder="Type your question here"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </form>
          <button
            onClick={handleHuman}
            disabled={humanRequested}
            className="border border-gray-300 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Ask Emiliano to review this
          </button>
        </div>
      ) : null}
    </div>
  );
}
