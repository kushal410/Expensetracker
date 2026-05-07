export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Expense Tracker</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Track income and expenses, view totals, and keep your budget organized.
          </p>
        </header>

        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Your Next.js app was still showing the default starter page. Replace this
            file to build your tracker UI.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              href="/"
            >
              Home
            </a>
            <a
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium hover:bg-black/[.04] dark:border-white/10 dark:hover:bg-white/[.06]"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js Docs
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
