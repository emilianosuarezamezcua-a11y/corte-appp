'use client';

import { useState } from 'react';

export default function CorePage() {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (inputText.trim().length < 20) {
      setError('Please paste at least 20 characters of plan text.');
      return;
    }
    setError('');
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
    </div>
  );
}
