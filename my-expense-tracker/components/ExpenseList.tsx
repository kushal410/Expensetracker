"use client";

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

type Props = {
  expenses: Expense[];
  onDeleted: () => void;
};

export function ExpenseList({ expenses, onDeleted }: Props) {
  async function deleteExpense(id: string) {
    await fetch(`/api/expenses?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    onDeleted();
  }

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-400">
        No expenses yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <div className="grid grid-cols-12 gap-3 border-b border-black/10 px-4 py-3 text-xs font-medium text-zinc-600 dark:border-white/10 dark:text-zinc-400">
        <div className="col-span-5">Title</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-3">Date</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>
      <ul>
        {expenses.map((e) => (
          <li
            key={e.id}
            className="grid grid-cols-12 gap-3 px-4 py-3 text-sm hover:bg-black/[.02] dark:hover:bg-white/[.04]"
          >
            <div className="col-span-5 truncate">
              <div className="font-medium">{e.title}</div>
              <button
                onClick={() => deleteExpense(e.id)}
                className="mt-1 text-xs text-red-600 hover:underline"
                type="button"
              >
                Delete
              </button>
            </div>
            <div className="col-span-2 text-zinc-600 dark:text-zinc-400">{e.category}</div>
            <div className="col-span-3 text-zinc-600 dark:text-zinc-400">
              {new Date(e.date).toLocaleDateString()}
            </div>
            <div className="col-span-2 text-right font-medium">
              ${Number(e.amount).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

