// Data for the /demo page. Content is static on purpose, no new tables.

export const WALKTHROUGH = [
  { href: '/core', title: 'Core agent', text: 'Paste a short business description. The rule-based agent extracts the problem, the user, the value and 5 key terms, and saves the result.' },
  { href: '/research', title: 'Research', text: 'See 5 global examples, 8 competitors and the risk map. Add a research note and it is saved to Supabase.' },
  { href: '/product', title: 'Product', text: 'Read what Corte App does for a food vendor and which plans exist.' },
  { href: '/pricing', title: 'Pricing simulator', text: 'Change vendors, growth and Pro percentage. The page calculates monthly and annual revenue and saves the scenario.' },
  { href: '/marketing', title: 'Marketing', text: 'Vote in the A/B tests and look at the saved marketing assets.' },
  { href: '/chat', title: 'Guided assistant', text: 'Answer 3 intake questions and get a recommended plan. Ask a tax question to see the guardrail and the human review button.' },
  { href: '/dashboard', title: 'Dashboard', text: 'See how many records each table has and the latest rows. This proves the data from all pages is really saved.' },
  { href: '/docs', title: 'Docs', text: 'Read the build logs and the prompt library for weeks 1 to 6.' },
];

export const PLANS = [
  { name: 'Free', price: '0 MXN per month' },
  { name: 'Growth', price: '99 MXN per month' },
  { name: 'Pro', price: '199 MXN per month' },
];

export const AGENTS = [
  { name: 'Core agent', page: '/core', input: 'Business description text', logic: 'Sentence split and keyword matching', output: 'Problem, user, value, 5 key terms', table: 'core_outputs' },
  { name: 'Research page', page: '/research', input: 'Research note and category', logic: 'Static data plus a note form', output: 'Examples, competitors, risk map, saved notes', table: 'research_notes' },
  { name: 'Pricing simulator', page: '/pricing', input: 'Vendors, growth, Pro percentage', logic: 'Fixed formulas with plan prices', output: 'Monthly and annual revenue', table: 'pricing_scenarios' },
  { name: 'Marketing engine', page: '/marketing', input: 'A/B votes and asset text', logic: 'Vote counting and saved assets', output: 'A/B results and asset list', table: 'marketing_assets, ab_votes' },
  { name: 'Guided assistant', page: '/chat', input: '3 intake answers and questions', logic: 'Fixed rules and a guardrail', output: 'Recommended plan, answers, rating', table: 'chat_sessions' },
];

export const IMPACT = {
  value: [
    'A food vendor can see in one place what they earned and spent each day, without a spreadsheet.',
    'The plans are cheap (Free, 99 MXN per month, 199 MXN per month) so a small stand can start for free.',
    'The guided assistant gives a plan recommendation in about a minute.',
  ],
  risks: [
    { risk: 'Users may think the assistant is a live AI or a tax advisor.', control: 'Every agent page says it is rule-based. The chat sends tax and legal questions to a guardrail answer and a human review button.' },
    { risk: 'Simulated numbers could be read as real results.', control: 'The pricing page is labeled as a simulator and the revenue numbers are scenarios, not forecasts.' },
    { risk: 'Data in Supabase is public to anyone who has the site key, because row security is off.', control: 'No names, emails or passwords are collected. Version 2 should turn on row security and add login.' },
    { risk: 'The chat gives only one answer when a message has two questions.', control: 'Known limit. It is listed in the Version 2 roadmap.' },
  ],
  limits: 'Corte App has not been used by real vendors yet. The impact above is what the product is designed to do, not measured results.',
};

export const ROADMAP = [
  { phase: 'Now (Version 1)', items: ['Rule-based agents on 5 pages', 'Data saved in 6 Supabase tables', 'Dashboard, docs and demo pages', 'Always visible menu and plan prices on the demo page'] },
  { phase: 'Next (Version 2)', items: ['Answer more than one question in the chat', 'Shorter instructions in the chat (Valeria)', 'Show a visible message when a pricing scenario is saved (Andrea)', 'Show plan prices at the top of the pricing simulator (Daniel)', 'Turn on row security and add simple login', 'Test with real food vendors, not only classmates'] },
  { phase: 'Later (Version 3)', items: ['More plan options in the simulator (Jorge)', 'Daily profit and expense form for the vendor', 'Optional live AI answers with a free tier', 'Weekly profit summary by message'] },
];

// Real results from 5 external testers. Feedback was given to me in Spanish and translated here.
export const TESTERS = [
  { name: 'Lucia', task: 'Tried chat and pricing', feedback: 'Looked for a navigation menu before seeing the main demo button. Would make the menu more visible at the top.', change: 'Made the menu fixed at the top and added a Start the walkthrough button.' },
  { name: 'Daniel', task: 'Tried chat and pricing', feedback: 'Did not find the prices right away on the simulator page. Would put the prices more accessible at the start of the simulator.', change: 'Added a plan prices strip at the top of the demo page. The simulator itself is in the Version 2 roadmap.' },
  { name: 'Valeria', task: 'Tried chat and pricing', feedback: 'Got stuck for a moment understanding how the assistant rules worked in the chat. Would use shorter instructions in the chat.', change: 'No change this week. Added to the Version 2 roadmap.' },
  { name: 'Jorge', task: 'Tried chat and pricing', feedback: 'No confusion seen in the pricing simulator. Would add more plan options in the simulator.', change: 'No change. More plans are out of scope this week, added to the roadmap.' },
  { name: 'Andrea', task: 'Tried chat and pricing', feedback: 'Doubted if the simulator saved changes to the database automatically. Would add a visual notice when data is saved to Supabase.', change: 'No change this week. Added to the Version 2 roadmap.' },
];

export const REGRESSION = [
  { area: 'Navigation', check: 'Every link in the nav bar opens its page', status: 'Not run yet' },
  { area: 'Core', check: 'Core agent extracts and saves a result', status: 'Not run yet' },
  { area: 'Pricing and Marketing', check: 'Simulator saves a scenario and A/B vote is counted', status: 'Not run yet' },
  { area: 'Chat', check: 'Intake, guardrail and rating still work', status: 'Not run yet' },
  { area: 'Dashboard', check: 'Counts increase after new records are saved', status: 'Not run yet' },
];
