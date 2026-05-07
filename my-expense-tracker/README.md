# Expense Tracker

An expense tracking web application built with Next.js (App Router), TypeScript, and Prisma + SQLite.

## Getting Started

Install deps and initialize the local database:

```bash
cd my-expense-tracker
npm install
npx prisma generate
npx prisma db push
```

Run the dev server:

```bash
cd my-expense-tracker
npm run dev
```

Open `http://localhost:3000`.

## Notes

- The Prisma datasource URL defaults to `file:./prisma/dev.db` (see `my-expense-tracker/prisma.config.ts`).
- API routes live at `my-expense-tracker/app/api/expenses/route.ts`.
