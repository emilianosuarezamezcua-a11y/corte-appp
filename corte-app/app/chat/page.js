'use client';

import { useState } from 'react';

const WELCOME = 'Hi! I am the Corte App guide. I can help you find the right plan in 3 quick questions.';

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

  function handleStart() {
    setStarted(true);
    setMessages(
      messages.concat([
        { role: 'user', text: 'Start' },
        { role: 'assistant', text: 'Great. The 3 questions are coming in the next update.' },
      ])
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Corte App guide</h1>
      <p className="text-gray-600 mb-4">
        Answer a few quick questions and get a plan that fits your business.
      </p>
      <p className="text-xs text-gray-500 mb-6">
        Fixed-rule assistant, not a live AI. It follows set rules and does not use an AI model.
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
    </div>
  );
}
