'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const GLOBAL_EXAMPLES = [
  {
    name: 'Loyverse POS',
    desc: 'Free point-of-sale + sales/inventory tracking, widely used by small shops and food stalls worldwide.',
    url: 'https://loyverse.com',
  },
  {
    name: 'Square for Restaurants',
    desc: 'POS and reporting suite for restaurants, with daily sales and profit dashboards.',
    url: 'https://squareup.com/us/en/restaurants',
  },
  {
    name: 'Fobesoft',
    desc: 'Dedicated daily restaurant profit-and-loss app tracking revenue, expenses, and margins in real time.',
    url: 'https://apps.apple.com/us/app/fobesoft/id6464009570',
  },
  {
    name: 'MenuCost',
    desc: 'Tracks ingredient and dish costs, logs sales, and shows daily vs. total profit for small food businesses.',
    url: 'https://apps.apple.com/mx/app/menucost/id6756733670',
  },
  {
    name: 'Hishabee',
    desc: 'Expense tracking app aimed at small, informal shop owners in emerging markets who currently track money on paper.',
    url: 'https://blog.hishabee.io',
  },
];

const COMPETITORS = [
  { name: 'Clip', type: 'Payments', target: 'Any small business', gap: 'Accepts card payments but has no profit or expense tracking.' },
  { name: 'Poster POS', type: 'POS / inventory', target: 'Small restaurants, franchises', gap: 'Full POS system, too complex and paid for a single-owner food stand.' },
  { name: 'Udd Soft', type: 'ERP / POS', target: 'Retail, multi-branch restaurants', gap: 'Built for multi-branch inventory management, not a solo daily-profit answer.' },
  { name: 'Square', type: 'POS', target: 'Restaurants, retail', gap: 'Strong in the US; limited local payment/banking integration in Mexico.' },
  { name: 'Loyverse', type: 'POS / inventory', target: 'Small shops globally', gap: 'Free tier is inventory-first, not designed around a single daily profit number.' },
  { name: 'Aspel / CONTPAQi', type: 'Accounting software', target: 'Formal small-to-medium businesses', gap: 'Built for invoicing/RFC compliance, overkill for an informal vendor.' },
  { name: 'Excel / Google Sheets', type: 'Manual template', target: 'Anyone', gap: 'Requires manual setup and daily discipline; no automatic daily answer.' },
  { name: 'Paper notebook / memory', type: 'Informal habit', target: 'Most current target users', gap: 'What most food-stand owners actually use today, error-prone, no visibility until it is too late.' },
];

const RISKS = [
  { label: 'Distrust of apps for cash businesses', x: 75, y: 30, self: false },
  { label: 'Why not just use Excel', x: 30, y: 65, self: false },
  { label: 'Clip/Poster bundling payments + tracking', x: 60, y: 70, self: false },
  { label: 'Low smartphone/data reliability at stalls', x: 20, y: 25, self: false },
  { label: 'Corte App (you)', x: 15, y: 55, self: true },
];

function ResearchIntake({ onSaved }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('competitor');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  async function handleSave(e) {
    e.preventDefault();
    if (text.trim().length < 20) {
      setError('Please write at least 20 characters for the research note.');
      setSavedMsg('');
      return;
    }
    setError('');
    setSaving(true);
    const result = await supabase.from('research_notes').insert({ note_text: text, category: category });
    const saveError = result.error;
    setSaving(false);
    if (saveError) {
      setSavedMsg('Save failed: ' + saveError.message);
    } else {
      setSavedMsg('Saved');
      setText('');
      onSaved();
    }
  }

  return (
    <form onSubmit={handleSave} className="mb-8">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a research note (competitor finding, risk, validation insight)..."
        className="w-full min-h-[100px] border border-gray-300 rounded-lg p-4 mb-2"
      />
      <div className="flex items-center gap-3 mb-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="competitor">Competitor</option>
          <option value="risk">Risk</option>
          <option value="validation">Validation</option>
        </select>
      </div>
      {error ? <p className="text-red-600 text-sm mb-2">{error}</p> : null}
      <button
        type="submit"
        disabled={saving}
        className="bg-gray-900 text-white px-6 py-2 rounded-lg"
      >
        {saving ? 'Saving...' : 'Save note'}
      </button>
      {savedMsg ? <p className="text-sm text-green-600 mt-2">{savedMsg}</p> : null}
    </form>
  );
}

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([]);

  async function loadRecent() {
    const result = await supabase
      .from('research_notes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecent(result.data || []);
  }

  useEffect(() => {
    loadRecent();
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = COMPETITORS.filter(function (c) {
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.type.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Research + benchmarking</h1>
      <p className="text-gray-600 mb-10">
        Evidence that the Corte App problem is real, and where it fits against existing tools.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Global examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GLOBAL_EXAMPLES.map(function (g) {
            return (
              <a
                key={g.name}
                href={g.url}
                target="_blank"
                rel="noreferrer"
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition block"
              >
                <p className="font-medium mb-1">{g.name}</p>
                <p className="text-sm text-gray-600">{g.desc}</p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Mexico localization</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Most target vendors operate cash-heavy, informal businesses without RFC/invoicing needs.</li>
          <li>WhatsApp is the default channel for orders and supplier coordination, not dedicated business apps.</li>
          <li>Card-terminal adoption is low among street vendors; Clip and similar fintechs solve payments, not profit tracking.</li>
          <li>Data connectivity at stalls/markets can be inconsistent, favoring a lightweight, fast-loading interface.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Competitors / substitutes</h2>
       <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name or type..."
          aria-label="Filter competitors"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Target user</th>
                <th className="py-2">Gap vs Corte App</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(function (c) {
                return (
                  <tr key={c.name} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">{c.name}</td>
                    <td className="py-2 pr-4">{c.type}</td>
                    <td className="py-2 pr-4">{c.target}</td>
                    <td className="py-2">{c.gap}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-gray-400 text-center">
                    No competitors match that filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Risk map</h2>
        <p className="text-xs text-gray-400 mb-2">
          Horizontal: competitive threat. Vertical: adoption difficulty. Blue dot: where Corte App sits today.
        </p>
        <div className="relative w-full h-56 border border-gray-200 rounded-lg bg-gray-50">
          {RISKS.map(function (r) {
            const dotClass = (r.self ? 'bg-blue-600' : 'bg-gray-900') + ' w-2.5 h-2.5 rounded-full mb-1';
            const labelClass = (r.self ? 'font-semibold text-blue-700' : 'text-gray-600') + ' text-[10px] text-center w-24 leading-tight';
            return (
              <div
                key={r.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: r.x + '%', top: r.y + '%' }}
              >
                <span className={dotClass} />
                <span className={labelClass}>{r.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Add a research note</h2>
        <ResearchIntake onSaved={loadRecent} />
      </section>

      <section>
        <p className="text-sm text-gray-500 mb-2">Recently saved</p>
        <div className="space-y-2">
          {recent.length === 0 ? (
            <p className="text-sm text-gray-400">Nothing saved yet.</p>
          ) : null}
          {recent.map(function (r) {
            return (
              <div key={r.id} className="border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">
                  {new Date(r.created_at).toLocaleString()} - {r.category}
                </p>
                <p className="text-sm">{r.note_text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
