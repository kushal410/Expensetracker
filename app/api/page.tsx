// app/page.tsx
"use client";
import { useEffect, useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, TrendingDown, PlusCircle } from 'lucide-react';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);

  const fetchExpenses = async () => {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    setExpenses(data);
    setTotal(data.reduce((acc: number, curr: Expense) => acc + curr.amount, 0));
  };

  useEffect(() => { fetchExpenses(); }, []);

  // Prepare data for Recharts
  const chartData = expenses.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">Expense Tracker</h1>
          <p className="text-slate-500">Manage your finances with ease.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 border border-slate-100">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><DollarSign /></div>
            <div>
              <p className="text-sm text-slate-500">Total Spent</p>
              <p className="text-2xl font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 border border-slate-100">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-lg"><TrendingDown /></div>
            <div>
              <p className="text-sm text-slate-500">Transactions</p>
              <p className="text-2xl font-bold">{expenses.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 border border-slate-100">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><PlusCircle /></div>
            <div>
              <p className="text-sm text-slate-500">Budget Status</p>
              <p className="text-2xl font-bold text-emerald-600">Healthy</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Col: Form & Chart */}
          <div className="space-y-8">
            <ExpenseForm onExpenseAdded={fetchExpenses} />
            
            <div className="bg-white p-6 rounded-2xl shadow-md h-64">
              <h3 className="text-lg font-bold mb-2 text-slate-800">Spending by Category</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Col: List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
            </div>
            <ul className="divide-y divide-slate-100">
              {expenses.map((exp) => (
                <li key={exp.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
                  <div>
                    <p className="font-semibold text-slate-800">{exp.title}</p>
                    <p className="text-xs text-slate-500">{exp.category} • {new Date(exp.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-bold text-rose-500">-${exp.amount.toFixed(2)}</p>
                </li>
              ))}
              {expenses.length === 0 && (
                <p className="p-10 text-center text-slate-400">No transactions recorded yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}