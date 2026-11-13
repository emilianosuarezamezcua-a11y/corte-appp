import Link from 'next/link';
import {
  WALKTHROUGH,
  PLANS,
  AGENTS,
  IMPACT,
  ROADMAP,
  TESTERS,
  REGRESSION,
} from './demoData';

export default function DemoPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      <header>
        <h1 className="text-3xl font-bold">Corte App demo</h1>
        <p className="mt-2 text-gray-600">
          Corte App helps small food vendors track their daily profit and expenses. This
          page is a guided tour of the whole site. All agents here are rule-based and
          simulated. None of them is a live AI.
        </p>
        <a
          href="#walkthrough"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Start the walkthrough
        </a>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PLANS.map(function (p) {
            return (
              <div key={p.name} className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-sm text-gray-500">Plan</p>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-700">{p.price}</p>
              </div>
            );
          })}
        </div>
      </header>

      <section id="walkthrough" className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Guided walkthrough</h2>
        <p className="text-sm text-gray-600">Follow the steps in order. Each one opens a real page.</p>
        <ol className="space-y-3">
          {WALKTHROUGH.map(function (step, i) {
            return (
              <li key={step.href} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <Link href={step.href} className="font-semibold text-blue-600 hover:underline">
                    {step.title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-700">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Agent map</h2>
        <p className="text-sm text-gray-600">
          How each agent works: input, logic, output and where the result is saved. All
          of them are rule-based and not a live AI.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {AGENTS.map(function (a) {
            return (
              <div key={a.name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{a.name}</h3>
                  <Link href={a.page} className="text-sm text-blue-600 hover:underline">
                    {a.page}
                  </Link>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="rounded bg-gray-100 px-3 py-2"><span className="font-semibold">Input: </span>{a.input}</div>
                  <div className="text-center text-gray-400">&darr;</div>
                  <div className="rounded bg-yellow-50 px-3 py-2"><span className="font-semibold">Logic (rule-based): </span>{a.logic}</div>
                  <div className="text-center text-gray-400">&darr;</div>
                  <div className="rounded bg-green-50 px-3 py-2"><span className="font-semibold">Output: </span>{a.output}</div>
                  <div className="text-center text-gray-400">&darr;</div>
                  <div className="rounded bg-blue-50 px-3 py-2"><span className="font-semibold">Saved in: </span>{a.table}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-600">
          The <Link href="/dashboard" className="text-blue-600 hover:underline">dashboard</Link>{' '}
          reads all of these tables in one place.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Practical impact check</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">What value it gives</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700">
            {IMPACT.value.map(function (v, i) {
              return <li key={i}>{v}</li>;
            })}
          </ul>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">What could go wrong and how it is handled</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 pr-4">Risk</th>
                  <th className="py-2">Control</th>
                </tr>
              </thead>
              <tbody>
                {IMPACT.risks.map(function (r, i) {
                  return (
                    <tr key={i} className="border-b border-gray-100 align-top">
                      <td className="py-2 pr-4">{r.risk}</td>
                      <td className="py-2">{r.control}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-gray-700"><span className="font-semibold">Honest limit: </span>{IMPACT.limits}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Testing summary</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">External users ({TESTERS.length} of 5)</h3>
          {TESTERS.length === 0 ? (
            <p className="mt-2 text-sm text-gray-600">No testers recorded yet.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4">#</th>
                    <th className="py-2 pr-4">Tester</th>
                    <th className="py-2 pr-4">Task</th>
                    <th className="py-2 pr-4">Feedback</th>
                    <th className="py-2">Change made</th>
                  </tr>
                </thead>
                <tbody>
                  {TESTERS.map(function (t, i) {
                    return (
                      <tr key={i} className="border-b border-gray-100 align-top">
                        <td className="py-2 pr-4">{i + 1}</td>
                        <td className="py-2 pr-4">{t.name}</td>
                        <td className="py-2 pr-4">{t.task}</td>
                        <td className="py-2 pr-4">{t.feedback}</td>
                        <td className="py-2">{t.change}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">Full-site regression test</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 pr-4">Area</th>
                  <th className="py-2 pr-4">Check</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {REGRESSION.map(function (r, i) {
                  return (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 pr-4">{r.area}</td>
                      <td className="py-2 pr-4">{r.check}</td>
                      <td className="py-2">{r.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Version 2 roadmap</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {ROADMAP.map(function (r) {
            return (
              <div key={r.phase} className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="font-semibold">{r.phase}</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {r.items.map(function (it, i) {
                    return <li key={i}>{it}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
