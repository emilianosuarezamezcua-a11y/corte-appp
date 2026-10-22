import Link from 'next/link';

const BENEFITS = [
  {
    title: 'See your profit daily',
    text: 'Know how much you really made today, without waiting for the end of the week.',
  },
  {
    title: 'Track every expense',
    text: 'Write down what you spend on supplies, so nothing gets lost in your head or on paper.',
  },
  {
    title: 'Simple on purpose',
    text: 'No accounting words and no complicated screens. Open it, type, and close it.',
  },
];

const STEPS = [
  { step: '1', title: 'Add your sales', text: 'Write what you sold today.' },
  { step: '2', title: 'Add your costs', text: 'Write what you spent on food and supplies.' },
  { step: '3', title: 'Close your day', text: 'See your profit in one quick number.' },
];

const ROADMAP = [
  { week: 'Week 0', item: 'Infrastructure setup: GitHub, Vercel, Supabase, Next.js' },
  { week: 'Week 1', item: 'Log a sale and log an expense' },
  { week: 'Week 2', item: 'Daily profit calculation and display' },
  { week: 'Week 3', item: 'Restock flag and spending breakdown' },
  { week: 'Week 4', item: 'Marketing engine: brand, content kit and A/B tests' },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-16">
        <p className="text-sm font-medium text-emerald-700 mb-3">
          For small food vendors and restaurant owners
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
          Know your profit before you close the day
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Corte App is a simple daily profit and expense tracker for people who
          need a quick answer, not a full accounting system.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/marketing"
            className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg text-sm"
          >
            See the marketing kit
          </Link>
          <Link
            href="/product"
            className="inline-block border border-gray-300 text-gray-900 px-6 py-2 rounded-lg text-sm bg-white"
          >
            Explore the product
          </Link>
          <Link
            href="/pricing"
            className="inline-block border border-gray-300 text-gray-900 px-6 py-2 rounded-lg text-sm bg-white"
          >
            Try the pricing simulator
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Why Corte App</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BENEFITS.map(function (b) {
            return (
              <div key={b.title} className="border border-gray-200 rounded-lg p-5 bg-white">
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map(function (s) {
            return (
              <div key={s.step} className="border border-gray-200 rounded-lg p-5 bg-white">
                <p className="text-sm font-medium text-emerald-700 mb-1">Step {s.step}</p>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Project roadmap</h2>
        <ul className="space-y-3">
          {ROADMAP.map(function (r) {
            return (
              <li key={r.week} className="border border-gray-200 rounded-lg p-4 bg-white">
                <span className="font-medium">{r.week}: </span>
                <span className="text-gray-600">{r.item}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
