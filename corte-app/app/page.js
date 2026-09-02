// Homepage: shows roadmap for the project
export default function Home() {
  const roadmap = [
    { week: 'Week 0', item: 'Infrastructure setup: GitHub, Vercel, Supabase, Next.js' },
    { week: 'Week 1', item: 'Log a sale and log an expense' },
    { week: 'Week 2', item: 'Daily profit calculation and display' },
    { week: 'Week 3', item: 'Restock flag and spending breakdown' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Corte App</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-10">
        A simple daily profit and expense tracker built for small restaurant
        owners and food stand vendors who need a quick answer, not a full
        accounting system.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Project roadmap</h2>
      <ul className="space-y-3">
        {roadmap.map((r) => (
          <li key={r.week} className="border border-gray-200 rounded-lg p-4 bg-white">
            <span className="font-medium">{r.week}: </span>
            <span className="text-gray-600">{r.item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
