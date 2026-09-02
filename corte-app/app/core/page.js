'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

function extractCore(text) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
  const used = new Set();

  function findSentence(keywords) {
    const idx = sentences.findIndex(
      (s, i) => !used.has(i) && keywords.some((k) => s.toLowerCase().includes(k))
    );
    if (idx !== -1) {
      used.add(idx);
      return sentences[idx];
    }
    const fallbackIdx = sentences.findIndex((s, i) => !used.has(i));
    if (fallbackIdx !== -1) {
      used.add(fallbackIdx);
      return sentences[fallbackIdx];
    }
    return sentences[0] || '';
  }

  const problem = findSentence(['problem', "don't have", 'lack', 'struggle']);
  const user = findSentence(['user', 'owner-operator', 'customer', 'vendor']);
  const value = findSentence(['value', 'tracker', 'solution', 'offers']);

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
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [recent, setRecent] = useState([]);

  async function loadRecent() {
    const { data } = await supabase
      .from('core_outputs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecent(data || []);
  }

  useEffect(() => {
    loadRecent();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputText.trim().length < 20) {
      setError('Please paste at least 20 characters of plan text.');
      setResult(null);
      return;
    }
    setError('');
    setSavedMsg('');
    setResult(extractCore(inputText));
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    const { error: saveError } = await supabase.from('core_outputs').insert({
      input_text: inputText,
      extracted_problem: result.problem,
      extracted_user: result.user,
      extracted_value: result.value,
      extracted_keywords: result.keywords,
    });
    setSaving(false);
    if (saveError) {
      setSavedMsg('Save failed. Please try again.');
    } else {
      setSavedMsg('Saved');
      loadRecent();
    }
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
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-8">
          <p className="text-xs text-gray-400 mb-4">
            Simulated extraction (rule-based, no AI API)
          </p>
          <div className="space-y-3 mb-4">
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
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-white border border-gray-300 px-6 py-2 rounded-lg"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          {savedMsg && <p className="text-sm text-green-600 mt-2">{savedMsg}</p>}
        </div>
      )}

      <div>
        <p className="text-sm text-gray-500 mb-2">Recently saved</p>
        <div className="space-y-2">
          {recent.length === 0 && (
            <p className="text-sm text-gray-400">Nothing saved yet.</p>
          )}
          {recent.map((r) => (
            <div key={r.id} className="border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">
                {new Date(r.created_at).toLocaleString()}
              </p>
              <p className="text-sm">{r.extracted_problem}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
