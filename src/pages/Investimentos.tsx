import { useState } from 'react';
import { useFinance } from '../contexts/useFinance';
import type { Expense } from '../contexts/FinanceContext';
import { InvestmentForm } from '../components/ui/investimentos/InvestmentForm';
import { InvestmentHistory } from '../components/ui/investimentos/InvestmentHistory';

export default function Investimentos() {
	const { expenses, addExpense, updateExpense, deleteExpense } = useFinance();
	const [editingInvestment, setEditingInvestment] = useState<Expense | null>(
		null,
	);

	const investmentExpenses = expenses
		.filter((expense) => expense.category === 'investimentos')
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

	const handleSubmit = (data: {
		description: string;
		amount: string;
		date: string;
	}) => {
		if (editingInvestment) {
			updateExpense(editingInvestment.id, {
				...editingInvestment,
				...data,
			});
			setEditingInvestment(null);
		} else {
			addExpense({
				id: Date.now().toString(),
				...data,
				category: 'investimentos',
			});
		}
	};

	const handleEdit = (investment: Expense) => {
		setEditingInvestment(investment);
	};

	const handleCancel = () => {
		setEditingInvestment(null);
	};

	const handleDelete = (id: string) => {
		deleteExpense(id);
		if (editingInvestment?.id === id) {
			setEditingInvestment(null);
		}
	};

	return (
		<main className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">
				Investimentos
			</h3>

			<InvestmentForm
				onSubmit={handleSubmit}
				initialData={
					editingInvestment
						? {
								description: editingInvestment.description,
								amount: editingInvestment.amount,
								date: editingInvestment.date,
							}
						: undefined
				}
				onCancel={handleCancel}
				isEditing={!!editingInvestment}
			/>

			<InvestmentHistory
				investments={investmentExpenses}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		</main>
	);
}
