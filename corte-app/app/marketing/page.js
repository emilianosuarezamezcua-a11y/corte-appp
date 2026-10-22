'use client';

const BRAND = {
  name: 'Corte App',
  tagline: 'Close your day knowing your numbers.',
  mission:
    'Help small food vendors see their daily profit in seconds, without accounting words or complicated screens.',
};

const COLORS = [
  { name: 'Ink', hex: '#111827', use: 'Text and main buttons' },
  { name: 'Paper', hex: '#F9FAFB', use: 'Page background' },
  { name: 'Corte Green', hex: '#047857', use: 'Accent and highlights' },
  { name: 'Soft Border', hex: '#E5E7EB', use: 'Cards and dividers' },
];

const VOICE = [
  'Simple: short sentences and everyday words.',
  'Friendly: talk like a neighbor, not like a bank.',
  'Direct: say the benefit first.',
  'No jargon: never use accounting terms the vendor does not use.',
];

const PERSONA = {
  name: 'Marisol',
  age: 38,
  role: 'Owns a taco stand with one helper',
  quote: 'I sell all day but I never know if I really made money.',
  goals: [
    'Know her real profit at the end of each day',
    'Stop losing track of what she spends on supplies',
    'Spend less than five minutes on paperwork',
  ],
  pains: [
    'Keeps numbers in her head or on loose paper',
    'Only finds out about a bad week when it is too late',
    'Finds accounting apps too complicated',
  ],
  channels: ['WhatsApp', 'Facebook', 'Instagram'],
};

const LANDING = {
  headline: 'Know your profit before you close the day',
  subheadline:
    'Corte App is a simple daily profit and expense tracker for people who need a quick answer, not a full accounting system.',
  benefits: [
    'See your profit every day, not at the end of the week',
    'Write down every expense in seconds',
    'No accounting words, no complicated screens',
  ],
  cta: 'Start tracking today',
};

export default function MarketingPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">Marketing engine</h1>
      <p className="text-gray-600 mb-2">
        The brand, the audience and the message for Corte App, all in one place.
      </p>
      <p className="text-xs text-gray-500 mb-10">
        All content on this page was written with AI help and edited by me. It is not generated live.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Brand system</h2>
        <div className="border border-gray-200 rounded-lg p-5 bg-white mb-4">
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold mb-3">{BRAND.name}</p>
          <p className="text-sm text-gray-500">Tagline</p>
          <p className="font-semibold mb-3">{BRAND.tagline}</p>
          <p className="text-sm text-gray-500">Mission</p>
          <p className="text-gray-700">{BRAND.mission}</p>
        </div>

        <h3 className="text-sm font-semibold mb-2">Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {COLORS.map(function (c) {
            return (
              <div key={c.name} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="h-16" style={{ backgroundColor: c.hex }} />
                <div className="p-3">
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.hex}</p>
                  <p className="text-xs text-gray-600 mt-1">{c.use}</p>
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="text-sm font-semibold mb-2">Typography</h3>
        <p className="text-sm text-gray-700 mb-6">
          Clean sans-serif, the same as the app. Bold for headlines, regular for body text.
        </p>

        <h3 className="text-sm font-semibold mb-2">Voice rules</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {VOICE.map(function (v) {
            return <li key={v}>{v}</li>;
          })}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-1">Target persona</h2>
        <p className="text-xs text-gray-500 mb-4">
          Fictional persona based on my target segment. It is not a real interview.
        </p>
        <div className="border border-gray-200 rounded-lg p-5 bg-white">
          <p className="font-semibold">
            {PERSONA.name}, {PERSONA.age}
          </p>
          <p className="text-sm text-gray-600 mb-3">{PERSONA.role}</p>
          <p className="italic text-gray-700 mb-5">&ldquo;{PERSONA.quote}&rdquo;</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Goals</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {PERSONA.goals.map(function (g) {
                  return <li key={g}>{g}</li>;
                })}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Pain points</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {PERSONA.pains.map(function (p) {
                  return <li key={p}>{p}</li>;
                })}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Where she is</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {PERSONA.channels.map(function (ch) {
                  return <li key={ch}>{ch}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Landing page copy</h2>
        <div className="border border-gray-200 rounded-lg p-5 bg-white">
          <p className="text-sm text-gray-500">Headline</p>
          <p className="text-2xl font-bold mb-4">{LANDING.headline}</p>
          <p className="text-sm text-gray-500">Subheadline</p>
          <p className="text-gray-700 mb-4">{LANDING.subheadline}</p>
          <p className="text-sm text-gray-500">Benefits</p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            {LANDING.benefits.map(function (b) {
              return <li key={b}>{b}</li>;
            })}
          </ul>
          <p className="text-sm text-gray-500 mb-1">Call to action</p>
          <span className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg text-sm">
            {LANDING.cta}
          </span>
        </div>
      </section>
    </main>
  );
}
