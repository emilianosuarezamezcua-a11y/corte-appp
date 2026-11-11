// Data for the /docs page: build logs and prompt library, weeks 1 to 6.
// Written from the real prompt logs of each weekly packet.

export const BUILD_LOGS = [
  {
    week: 'Week 1',
    title: 'Core agent (/core)',
    built: 'Setup of GitHub, Vercel, Supabase and Next.js. A rule-based core agent that reads a business idea and extracts problem, user, value and keywords. Results are saved in the core_outputs table.',
    problem: 'The Problem and User fields returned the same sentence. A second fix was needed because User still matched the wrong sentence. Saving also failed with an invalid API key until the Vercel variable type was changed from Secret to Config.',
    decision: 'Used a rule-based agent with no paid API, and labeled it clearly as not a live AI.',
  },
  {
    week: 'Week 2',
    title: 'Research dashboard (/research)',
    built: 'Research page with global examples, competitor table, risk map and a note form that saves to research_notes.',
    problem: 'Pasting the code into GitHub dropped an opening link tag twice. It was fixed by typing that one tag by hand. My teacher asked where I was on the risk map, so I added Corte App as a point.',
    decision: 'Kept the data static and only the notes in Supabase, so the page works even if the database is empty.',
  },
  {
    week: 'Week 3',
    title: 'Product and pricing (/product, /pricing)',
    built: 'Product page and a pricing simulator with Free, Growth (99 MXN per month) and Pro (199 MXN per month). Scenarios are saved in pricing_scenarios.',
    problem: 'A Vercel build failed because a page that uses state was missing the use client line. A manual edit also duplicated imports, so I asked for the full corrected file.',
    decision: 'Asked for the complete file each time instead of small patches, to avoid copy mistakes.',
  },
  {
    week: 'Week 4',
    title: 'Marketing engine (/marketing)',
    built: 'Marketing page with saved marketing assets, two A/B tests whose votes are saved in ab_votes, and a better landing page on the homepage.',
    problem: 'A/B votes needed to be counted from real clicks and not typed by hand, so the results come from the database.',
    decision: 'Kept the copy simple and focused on food vendors.',
  },
  {
    week: 'Week 5',
    title: 'Guided assistant (/chat)',
    built: 'A fixed-rule chat with 3 intake questions, a guardrail for tax and legal questions, a human review button, a rating with comment, and sessions saved in chat_sessions.',
    problem: 'After three external tests I made the input box bigger, added a scroll box, quick question buttons and a phone rule. A message with two questions still gets only one answer.',
    decision: 'Did not use a live AI. The chat is rule-based and says so on the page.',
  },
  {
    week: 'Week 6',
    title: 'Integrated venture (/dashboard, /docs, /demo)',
    built: 'One navigation bar for the whole site, a dashboard that reads the six tables, this docs page, and a demo page with a guided walkthrough, agent map, impact check, testing summary and Version 2 roadmap.',
    problem: 'The dashboard and demo links returned 404 until their pages were created, so the deploy order was planned: data files first, then pages.',
    decision: 'No new tables and no new paid tools. Everything new reads the data that already exists.',
  },
];

export const PROMPT_LIBRARY = [
  {
    week: 'Week 1',
    prompts: [
      'Help me to answer these based on what I just told you: Product Spec, Architecture. Used before any code was written.',
      'Give me the files to create in GitHub so I can pass them to Vercel. Asked for package.json, the Next.js structure, Tailwind config, Navbar, Footer, homepage and a docs page.',
      'I already put the zip in my GitHub. Before putting it into Vercel do I have to do anything else? This found the nested folder problem.',
      'Ayudame a arreglarlo. Asked for a fix when Problem and User returned the same text.',
      'No quiero usar la Legacy anon key, prefiero otra solucion. Pushed back on a workaround and asked for another diagnosis.',
    ],
  },
  {
    week: 'Week 2',
    prompts: [
      'Complete the Build Discipline Packet for Week 2 before any code, with the same macro-prompt pattern as before.',
      'Give me the exact page.js for /research after I shared the /core file so the import path matches.',
      'Check that this large pasted file matches the intended code, line by line.',
      'Where does the risk map section go in the file? Asked for exact location instead of guessing.',
    ],
  },
  {
    week: 'Week 3',
    prompts: [
      'Shared the full Week 3 assignment and asked to complete the packet step by step before any code.',
      'Create the pricing_scenarios table in Supabase and check every column.',
      'Give me the complete code for /product and /pricing.',
      'Here is the Vercel build error screenshot. What is wrong?',
      'Give me the complete corrected file after my manual edit duplicated imports.',
    ],
  },
  {
    week: 'Week 4',
    prompts: [
      'Shared the full Week 4 assignment and asked to complete the packet before any code.',
      'Create the tables for marketing assets and A/B votes in Supabase.',
      'Give me the complete /marketing page with two A/B tests and saved assets.',
      'Upgrade the homepage into a clearer landing page for food vendors.',
      'Run the 2 A/B tests and 3 software tests and document them.',
    ],
  },
  {
    week: 'Week 5',
    prompts: [
      'Shared the full Week 5 assignment and asked to complete the packet before any code.',
      'Create the chat_sessions table and check it in Table Editor.',
      'Create the /chat page with the message UI.',
      'Add the intake flow with 3 questions.',
      'Add the response logic and the guardrail, then test it with a tax question.',
      'Save sessions to Supabase and add the human review button, then the rating.',
      'Improve the chat after the external user tests (bigger input, scroll box, quick questions, phone rule).',
    ],
  },
  {
    week: 'Week 6',
    prompts: [
      'Shared the full Week 6 assignment, macro-prompts and rubric and asked to complete the packet before any code.',
      'Replace the Navbar with one navigation bar that links to every page.',
      'Create the /dashboard page that reads the six tables and shows counts and the latest rows.',
      'Extend /docs with the build logs and prompt library from weeks 1 to 6.',
      'Create the /demo page with a guided walkthrough, agent map, impact check, testing summary and Version 2 roadmap.',
    ],
  },
];
