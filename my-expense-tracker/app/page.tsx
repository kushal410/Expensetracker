"use client";

import { useEffect, useMemo, useState } from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { StatsCard } from "@/components/StatsCard";

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [expenses],
  );

  async function refresh() {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/expenses", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load expenses");
      const data = (await res.json()) as Expense[];
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Expense Tracker</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Track income and expenses, view totals, and keep your budget organized.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatsCard label="Total spent" value={`$${total.toFixed(2)}`} />
          <StatsCard label="Expenses" value={`${expenses.length}`} />
        </section>

        <ExpenseForm onCreated={refresh} />

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-200">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-400">
            Loading...
          </div>
        ) : (
          <ExpenseList expenses={expenses} onDeleted={refresh} />
        )}
      </main>
    </div>
  );
}
