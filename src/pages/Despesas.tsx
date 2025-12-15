import { useFinance } from '../contexts/useFinance';
import { ExpenseForm } from '../components/ui/form';
import History from '../components/ui/history';

export default function Despesas() {
	const { expenses, addExpense, deleteExpense } = useFinance();

	const handleSubmit = (data: {
		description: string;
		amount: string;
		date: string;
	}) => {
		addExpense({
			id: Date.now().toString(),
			...data,
		});
	};

	const handleDelete = (id: string) => {
		deleteExpense(id);
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Despesas</h3>

			<ExpenseForm onSubmit={handleSubmit} />
			<History type="expense" items={expenses} onDelete={handleDelete} />
		</main>
	);
}
