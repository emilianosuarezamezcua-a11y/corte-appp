'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ASSUMPTIONS = {
  conservative: { churnRate: 0.08, referralVendors: 0.5, conversionRate: 0.10 },
  optimistic: { churnRate: 0.03, referralVendors: 1.5, conversionRate: 0.25 },
};

function PricingCalculator() {
  const [vendorCount, setVendorCount] = useState(100);
  const [growthPct, setGrowthPct] = useState(100);
  const [proPct, setProPct] = useState(0);
  const [scenarioType, setScenarioType] = useState('conservative');
  const [scenarioName, setScenarioName] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [recent, setRecent] = useState([]);

  async function loadRecent() {
    const result = await supabase
      .from('pricing_scenarios')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecent(result.data || []);
  }

  useEffect(function () {
    loadRecent();
  }, []);

  const assumptions = ASSUMPTIONS[scenarioType];
  const vendorCountValid = vendorCount > 0;
  const mixValid = growthPct + proPct <= 100;

  let monthlyRevenue = 0;
  let annualRevenue = 0;
  let adjustedMonthlyRevenue = 0;

  if (vendorCountValid && mixValid) {
    monthlyRevenue = vendorCount * ((growthPct / 100) * 99 + (proPct / 100) * 199);
    annualRevenue = monthlyRevenue * 12;
    adjustedMonthlyRevenue = monthlyRevenue * (1 - assumptions.churnRate);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!vendorCountValid) {
      setError('Vendor count must be greater than 0.');
      setSavedMsg('');
      return;
    }
    if (!mixValid) {
      setError('Growth % + Pro % cannot exceed 100.');
      setSavedMsg('');
      return;
    }
    if (scenarioName.trim().length < 3) {
      setError('Please give this scenario a name (at least 3 characters).');
      setSavedMsg('');
      return;
    }
    setError('');
    setSaving(true);
    const result = await supabase.from('pricing_scenarios').insert({
      scenario_name: scenarioName,
      vendor_count: vendorCount,
      growth_pct: growthPct,
      pro_pct: proPct,
      scenario_type: scenarioType,
      monthly_revenue: monthlyRevenue,
      annual_revenue: annualRevenue,
    });
    setSaving(false);
    if (result.error) {
      setSavedMsg('Save failed: ' + result.error.message);
    } else {
      setSavedMsg('Saved');
      setScenarioName('');
      loadRecent();
    }
  }

  return (
    <div>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Revenue calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Vendor count</label>
            <input
              type="number"
              value={vendorCount}
              onChange={function (e) { setVendorCount(Number(e.target.value)); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Growth tier %</label>
            <input
              type="number"
              value={growthPct}
              onChange={function (e) { setGrowthPct(Number(e.target.value)); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Pro tier %</label>
            <input
              type="number"
              value={proPct}
              onChange={function (e) { setProPct(Number(e.target.value)); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Scenario</label>
          <select
            value={scenarioType}
            onChange={function (e) { setScenarioType(e.target.value); }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="conservative">Conservative</option>
            <option value="optimistic">Optimistic</option>
          </select>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600">Monthly revenue</p>
          <p className="text-2xl font-bold">${monthlyRevenue.toFixed(2)} MXN</p>
          <p className="text-sm text-gray-600 mt-2">Annual revenue</p>
          <p className="text-lg font-semibold">${annualRevenue.toFixed(2)} MXN</p>
          <p className="text-sm text-gray-600 mt-2">
            Adjusted monthly revenue (after {(assumptions.churnRate * 100).toFixed(0)}% churn, {scenarioType})
          </p>
          <p className="text-lg font-semibold">${adjustedMonthlyRevenue.toFixed(2)} MXN</p>
        </div>

        <h3 className="text-sm font-semibold mb-2">Assumptions ({scenarioType})</h3>
        <table className="text-sm border-collapse mb-6">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-1 pr-4 text-gray-600">Churn rate</td>
              <td className="py-1 font-medium">{(assumptions.churnRate * 100).toFixed(0)}%</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-1 pr-4 text-gray-600">Avg. vendors per referral</td>
              <td className="py-1 font-medium">{assumptions.referralVendors}</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 text-gray-600">Conversion rate</td>
              <td className="py-1 font-medium">{(assumptions.conversionRate * 100).toFixed(0)}%</td>
            </tr>
          </tbody>
        </table>

        <form onSubmit={handleSave}>
          <label className="block text-sm text-gray-600 mb-1">Scenario name</label>
          <input
            type="text"
            value={scenarioName}
            onChange={function (e) { setScenarioName(e.target.value); }}
            placeholder="e.g. Base case for month 1"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2"
          />
          {error ? <p className="text-red-600 text-sm mb-2">{error}</p> : null}
          <button
            type="submit"
            disabled={saving}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg disabled:opacity-40"
          >
            {saving ? 'Saving...' : 'Save scenario'}
          </button>
          {savedMsg ? <p className="text-sm text-green-600 mt-2">{savedMsg}</p> : null}
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recently saved scenarios</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          {recent.map(function (r) {
            return (
              <li key={r.id}>
                {r.scenario_name} — {r.vendor_count} vendors ({r.growth_pct}% Growth / {r.pro_pct}% Pro,{' '}
                {r.scenario_type}) — ${Number(r.monthly_revenue).toFixed(2)} MXN/mo
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">Pricing</h1>
      <p className="text-gray-600 mb-10">
        Simulate monthly and annual revenue under different vendor mixes and scenario assumptions.
      </p>
      <PricingCalculator />
    </main>
  );
}
