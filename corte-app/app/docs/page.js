import { BUILD_LOGS, PROMPT_LIBRARY } from './docsData';

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Docs</h1>
        <p className="mt-2 text-gray-600">
          How Corte App was built, week by week. Every &ldquo;agent&rdquo; in this site is
          rule-based. None of them is a live AI, and each page says so.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What each agent does</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">Week 1: Core agent</h3>
          <p className="mt-2 text-sm text-gray-700">
            The core agent reads a text and splits it into sentences. It uses keyword
            matching to pick one sentence for the problem, one for the user and one for the
            value. It never reuses the same sentence twice. It also shows the top 5 key
            terms. The result is saved in the core_outputs table.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">Week 2: Research page</h3>
          <p className="mt-2 text-sm text-gray-700">
            The research page uses static data: 5 global examples and 8 competitors. The
            note form saves each note to Supabase in the research_notes table.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Build logs</h2>
        {BUILD_LOGS.map(function (log) {
          return (
            <div key={log.week} className="rounded-lg border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase text-blue-600">{log.week}</p>
              <h3 className="font-semibold">{log.title}</h3>
              <dl className="mt-3 space-y-2 text-sm text-gray-700">
                <div>
                  <dt className="font-semibold">What was built</dt>
                  <dd>{log.built}</dd>
                </div>
                <div>
                  <dt className="font-semibold">What went wrong or changed</dt>
                  <dd>{log.problem}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Decision</dt>
                  <dd>{log.decision}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Prompt library</h2>
        <p className="text-sm text-gray-600">
          The prompts used with the coding assistant each week, shortened to one line each.
        </p>
        {PROMPT_LIBRARY.map(function (group) {
          return (
            <div key={group.week} className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="font-semibold">{group.week}</h3>
              <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-gray-700">
                {group.prompts.map(function (p, i) {
                  return <li key={i}>{p}</li>;
                })}
              </ol>
            </div>
          );
        })}
      </section>
    </div>
  );
}
