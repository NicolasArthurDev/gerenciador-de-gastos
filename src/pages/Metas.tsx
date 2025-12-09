import { useFinance } from '../contexts/FinanceContext';
import { GoalForm } from '../components/ui/metas';
import { GoalList } from '../components/ui/metas/golList';

export default function Metas() {
	const { goals, addGoal, updateGoal, deleteGoal } = useFinance();

	const handleSubmit = (data: { description: string; targetAmount: string; deadline: string }) => {
		const newGoal = {
			id: Date.now().toString(),
			description: data.description,
			targetAmount: data.targetAmount,
			currentAmount: '0',
			deadline: data.deadline,
		};
		addGoal(newGoal);
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Metas Financeiras</h3>

			<GoalForm onSubmit={handleSubmit} />

			<GoalList goals={goals} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal} />
		</main>
	);
}
