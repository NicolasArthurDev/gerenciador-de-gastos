import { useEffect, useState } from 'react';
import { ExpenseForm } from '../components/ui/form';
import History from '../components/ui/history';

interface Expense {
	id: string;
	description: string;
	amount: string;
	date: string;
}

export default function Despesas() {
	const [expenses, setExpenses] = useState<Expense[]>(() => {
		const saved = localStorage.getItem('expenses');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}, [expenses]);

	const handleSubmit = (data: { description: string; amount: string; date: string }) => {
		const newExpense: Expense = {
			id: Date.now().toString(),
			...data,
		};
		setExpenses((prev) => [...prev, newExpense]);
	};

	const handleDelete = (id: string) => {
		setExpenses((prev) => prev.filter((expense) => expense.id !== id));
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Despesas</h3>

			<ExpenseForm onSubmit={handleSubmit} />

			<History type="expense" items={expenses} onDelete={handleDelete} />
		</main>
	);
}
