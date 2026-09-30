const FEATURES = [
  { name: 'Daily profit/expense tracking', free: true, growth: true, pro: true },
  { name: 'Research + benchmarking dashboard', free: false, growth: true, pro: true },
  { name: 'Pricing simulator (internal use)', free: false, growth: true, pro: true },
  { name: 'Priority support', free: false, growth: false, pro: true },
  { name: 'Multi-user access', free: false, growth: false, pro: true },
];

const TIERS = [
  { name: 'Free', price: 0, target: 'Testing the app with 1 vendor' },
  { name: 'Growth', price: 99, target: 'Solo street vendor ready to commit' },
  { name: 'Pro', price: 199, target: 'Small restaurant with multiple staff' },
];

const SEGMENTS = [
  {
    name: 'Solo street vendor',
    desc: 'Runs a single stall, tracks money by memory or paper, needs the basics fast.',
    recommended: 'Growth',
  },
  {
    name: 'Small multi-staff restaurant',
    desc: 'Has more than one person handling sales, needs sharper reporting and support.',
    recommended: 'Pro',
  },
];

function Check({ ok }) {
  if (ok) {
    return <span className="text-green-600">✓</span>;
  }
  return <span className="text-gray-300">—</span>;
}

export default function ProductPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">Product</h1>
      <p className="text-gray-600 mb-10">
        How Corte App's features map across plans, and which plan fits which kind of vendor.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Feature map</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4">Feature</th>
                <th className="py-2 px-4 text-center">Free</th>
                <th className="py-2 px-4 text-center">Growth</th>
                <th className="py-2 px-4 text-center">Pro</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map(function (f) {
                return (
                  <tr key={f.name} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">{f.name}</td>
                    <td className="py-2 px-4 text-center"><Check ok={f.free} /></td>
                    <td className="py-2 px-4 text-center"><Check ok={f.growth} /></td>
                    <td className="py-2 px-4 text-center"><Check ok={f.pro} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Pricing tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map(function (t) {
            return (
              <div key={t.name} className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-1">{t.name}</h3>
                <p className="text-2xl font-bold mb-2">
                  {t.price === 0 ? 'Free' : '$' + t.price + ' MXN/mo'}
                </p>
                <p className="text-sm text-gray-600">{t.target}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Customer segments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SEGMENTS.map(function (s) {
            return (
              <div key={s.name} className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-1">{s.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{s.desc}</p>
                <p className="text-sm">
                  Recommended plan: <span className="font-semibold text-blue-700">{s.recommended}</span>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
