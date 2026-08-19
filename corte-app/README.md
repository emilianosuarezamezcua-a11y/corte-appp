# Corte App

A simple daily profit and expense tracker for small restaurant owners and food stand vendors.

## Problem
Small restaurant owners don't have an easy way to know if they made money
today or what they need to buy for tomorrow. They track things in their head,
on paper, or in messy spreadsheets, so they often find out they're losing
money too late — and don't know exactly where.

## Tech stack
- Next.js (React)
- Tailwind CSS
- Supabase (Postgres database)
- Vercel (hosting)

## Setup instructions
1. Clone this repo
2. Run `npm install`
3. Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
4. Run `npm run dev` to start locally
5. Push to `main` to auto-deploy on Vercel

## Roadmap
See the homepage for the week-by-week plan.
