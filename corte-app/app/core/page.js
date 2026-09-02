'use client';

import { useState } from 'react';

function extractCore(text) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);

  function findSentence(keywords) {
    const found = sentences.find((s) =>
      keywords.some((k) => s.toLowerCase().includes(k))
    );
    return found || sentences[0] || '';
  }

  const problem = findSentence(['problem', "don't have", 'lack', 'struggle']);
  const user = findSentence(['user', 'owner', 'customer', 'vendor']);
  const value = findSentence(['value', 'tracker', 'solution', 'simple']);

  const stopwords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
    'to', 'of', 'in', 'on', 'for', 'with', 'that', 'this', 'it', 'they',
    'their', 'have', 'has', 'know', 'don', 'often', 'once',
  ]);
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stopwords.has(w));

  const freq = {};
  words.forEach((w) => {
    freq[w] = (freq[w] || 0) + 1;
  });
  const keywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w)
    .join(', ');

  return { problem, user, value, keywords };
}

export default function CorePage() {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputText.trim().length < 20) {
      setError('Please paste at least 20 characters of plan text.');
      setResult(null);
      return;
    }
    setError('');
    setResult(extractCore(inputText));
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Generative core agent</h1>
      <p className="text-gray-600 mb-8">
        Paste your business plan text below and get back its core.
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your business plan here..."
          className="w-full min-h-[160px] border border-gray-300 rounded-lg p-4 mb-2"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded-lg"
        >
          Extract core
        </button>
      </form>

      {result && (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <p className="text-xs text-gray-400 mb-4">
            Simulated extraction (rule-based, no AI API)
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Problem</p>
              <p className="text-sm">{result.problem}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User</p>
              <p className="text-sm">{result.user}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Value proposition</p>
              <p className="text-sm">{result.value}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Key terms</p>
              <p className="text-sm">{result.keywords}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
