export default function Docs() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Docs</h1>
      <p className="text-gray-600 mb-10">
        Documentation for the features built so far.
      </p>

      <h2 className="text-xl font-semibold mb-2">Core agent (Week 1)</h2>
      <p className="text-gray-600 mb-4">
        The Generative Core Agent on the /core page takes any pasted business
        plan text and extracts a structured "core" summary. This is not a
        real AI call — no paid API is used, per course constraints. Instead,
        it uses a simple rule-based method:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
        <li>
          The text is split into sentences.
        </li>
        <li>
          Each field (Problem, User, Value proposition) looks for the first
          unused sentence containing a relevant keyword (e.g. "problem" or
          "don't have" for Problem; "user", "owner", "vendor" for User).
        </li>
        <li>
          Once a sentence is used for one field, it cannot be reused for
          another field, to avoid duplicate results.
        </li>
        <li>
          Key terms are the 5 most frequent significant words in the text,
          excluding common stopwords.
        </li>
      </ul>
      <p className="text-gray-600">
        Results can be saved to a Supabase table called{' '}
        <code className="bg-gray-100 px-1 rounded">core_outputs</code>, and
        the 5 most recent saved entries are shown on the same page.
      </p>
    </div>
  );
}
