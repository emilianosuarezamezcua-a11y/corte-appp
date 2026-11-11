'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const TABLES = [
  { name: 'core_outputs', label: 'Core outputs', source: 'Week 1, page /core' },
  { name: 'research_notes', label: 'Research notes', source: 'Week 2, page /research' },
  { name: 'pricing_scenarios', label: 'Pricing scenarios', source: 'Week 3, page /pricing' },
  { name: 'marketing_assets', label: 'Saved marketing assets', source: 'Week 4, page /marketing' },
  { name: 'ab_votes', label: 'A/B votes', source: 'Week 4, page /marketing' },
  { name: 'chat_sessions', label: 'Chat sessions', source: 'Week 5, page /chat' },
];

function formatValue(value) {
  if (value === null || value === undefined) {
    return '-';
  }
  let text = '';
  if (typeof value === 'object') {
    text = JSON.stringify(value);
  } else {
    text = String(value);
  }
  if (text.length > 60) {
    return text.slice(0, 60) + '...';
  }
  return text;
}

async function loadTable(name) {
  const result = await supabase
    .from(name)
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .limit(5);

  if (result.error) {
    return { name: name, count: 0, rows: [], error: result.error.message };
  }
  return {
    name: name,
    count: result.count || 0,
    rows: result.data || [],
    error: '',
  };
}

export default function DashboardPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    const all = await Promise.all(
      TABLES.map(function (t) {
        return loadTable(t.name);
      })
    );
    setResults(all);
    setLoading(false);
  }

  useEffect(function () {
    loadAll();
  }, []);

  let total = 0;
  for (let i = 0; i < results.length; i++) {
    total = total + results[i].count;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-2">
        All the records saved by the pages of Corte App, in one place.
      </p>
      <p className="text-xs text-gray-500 mb-6">
        Read only. This page only shows data, it does not edit or delete anything.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={loadAll}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm"
        >
          Refresh
        </button>
        <p className="text-sm text-gray-600">
          {loading ? 'Loading...' : 'Total records: ' + total}
        </p>
      </div>

      {!loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {TABLES.map(function (t, i) {
            const r = results[i];
            if (!r) {
              return null;
            }
            return (
              <div
                key={t.name}
                className="border border-gray-200 bg-white rounded-lg p-4"
              >
                <p className="text-xs text-gray-500">{t.source}</p>
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-2xl font-bold">{r.count}</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {!loading
        ? TABLES.map(function (t, i) {
            const r = results[i];
            if (!r) {
              return null;
            }
            const columns = r.rows.length > 0 ? Object.keys(r.rows[0]) : [];
            return (
              <div key={t.name} className="mb-10">
                <h2 className="text-xl font-semibold mb-1">{t.label}</h2>
                <p className="text-xs text-gray-500 mb-3">
                  Table {t.name}, latest 5 records
                </p>

                {r.error ? (
                  <p className="text-sm text-red-600">
                    Could not load this table: {r.error}
                  </p>
                ) : null}

                {!r.error && r.rows.length === 0 ? (
                  <p className="text-sm text-gray-600">No records yet.</p>
                ) : null}

                {r.rows.length > 0 ? (
                  <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-100 text-gray-700">
                        <tr>
                          {columns.map(function (c) {
                            return (
                              <th key={c} className="px-3 py-2 font-medium">
                                {c}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {r.rows.map(function (row, rowIndex) {
                          return (
                            <tr key={rowIndex} className="border-t border-gray-100">
                              {columns.map(function (c) {
                                return (
                                  <td key={c} className="px-3 py-2 text-gray-700">
                                    {formatValue(row[c])}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
}
