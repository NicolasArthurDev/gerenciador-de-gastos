import { useState } from 'react';
import { useFinance } from '../contexts/useFinance';
import type { Expense, ExpenseCategory } from '../contexts/FinanceContext';
import { ExpenseForm } from '../components/ui/form';
import History from '../components/ui/history';

export default function Despesas() {
	const { expenses, addExpense, updateExpense, deleteExpense } = useFinance();
	const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

	const handleSubmit = (data: {
		description: string;
		amount: string;
		date: string;
		category: ExpenseCategory;
	}) => {
		if (editingExpense) {
			updateExpense(editingExpense.id, {
				...editingExpense,
				...data,
			});
			setEditingExpense(null);
		} else {
			addExpense({
				id: Date.now().toString(),
				...data,
			});
		}
	};

	const handleEdit = (item: Expense) => {
		setEditingExpense(item);
	};

	const handleCancel = () => {
		setEditingExpense(null);
	};

	const handleDelete = (id: string) => {
		deleteExpense(id);
		if (editingExpense?.id === id) {
			setEditingExpense(null);
		}
	};

	return (
		<main className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Despesas</h3>

			<ExpenseForm
				onSubmit={handleSubmit}
				initialData={
					editingExpense
						? {
								description: editingExpense.description,
								amount: editingExpense.amount,
								date: editingExpense.date,
								category: editingExpense.category,
							}
						: undefined
				}
				onCancel={handleCancel}
				isEditing={!!editingExpense}
			/>
			<History
				type="expense"
				items={expenses}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
		</main>
	);
}
