"use client";

import { useMemo, useState } from "react";

type Props = {
  onCreated: () => void;
};

const categories = ["Food", "Rent", "Transport", "Entertainment", "Other"] as const;

export function ExpenseForm({ onCreated }: Props) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Food");
  const [date, setDate] = useState(today);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount, category, date }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Failed to add expense");
      }
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate(today);
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="text-lg font-semibold tracking-tight">Add expense</div>

      <div className="mt-4 grid gap-3">
        <input
          className="h-11 rounded-xl border border-black/10 bg-transparent px-3 outline-none focus:ring-2 focus:ring-zinc-300 dark:border-white/10 dark:focus:ring-zinc-700"
          placeholder="Title (e.g., Groceries)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            className="h-11 rounded-xl border border-black/10 bg-transparent px-3 outline-none focus:ring-2 focus:ring-zinc-300 dark:border-white/10 dark:focus:ring-zinc-700"
            placeholder="Amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select
            className="h-11 rounded-xl border border-black/10 bg-transparent px-3 outline-none focus:ring-2 focus:ring-zinc-300 dark:border-white/10 dark:focus:ring-zinc-700"
            value={category}
            onChange={(e) => setCategory(e.target.value as (typeof categories)[number])}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            className="h-11 rounded-xl border border-black/10 bg-transparent px-3 outline-none focus:ring-2 focus:ring-zinc-300 dark:border-white/10 dark:focus:ring-zinc-700"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

