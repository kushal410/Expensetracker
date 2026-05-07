// components/ExpenseForm.tsx
"use client";
import React, { useState } from 'react';

interface Props {
  onExpenseAdded: () => void;
}

export default function ExpenseForm({ onExpenseAdded }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
    onExpenseAdded(); // Refresh the list
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 text-gray-800">
      <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
      <input 
        type="text" placeholder="Title (e.g. Groceries)" required
        className="w-full p-2 border rounded"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      <input 
        type="number" placeholder="Amount ($)" required step="0.01"
        className="w-full p-2 border rounded"
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
      />
      <select 
        className="w-full p-2 border rounded"
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      >
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <input 
        type="date" className="w-full p-2 border rounded"
        value={formData.date}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
      />
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
        Add Expense
      </button>
    </form>
  );
}