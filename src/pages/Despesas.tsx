import { useFinance } from '../contexts/FinanceContext';
import Form from '../components/ui/form';
import History from '../components/ui/history';

export default function Despesas() {
	const { expenses, addExpense, deleteExpense } = useFinance();

	const handleSubmit = (data: { description: string; amount: string; date: string }) => {
		const newExpense = {
			id: Date.now().toString(),
			...data,
		};
		addExpense(newExpense);
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Despesas</h3>

			<Form type="expense" onSubmit={handleSubmit} />

			<History type="expense" items={expenses} onDelete={deleteExpense} />
		</main>
	);
}
