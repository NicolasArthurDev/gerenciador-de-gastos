import { useEffect, useState } from 'react';
import { GoalForm } from '../components/ui/metas';
import { GoalList } from '../components/ui/metas/golList';

interface Goal {
	id: string;
	description: string;
	targetAmount: string;
	currentAmount: string;
	deadline: string;
}

export default function Metas() {
	const [goals, setGoals] = useState<Goal[]>(() => {
		const saved = localStorage.getItem('goals');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('goals', JSON.stringify(goals));
	}, [goals]);

	const handleSubmit = (data: { description: string; targetAmount: string; deadline: string }) => {
		const newGoal: Goal = {
			id: Date.now().toString(),
			description: data.description,
			targetAmount: data.targetAmount,
			currentAmount: '0',
			deadline: data.deadline,
		};
		setGoals((prev) => [...prev, newGoal]);
	};

	const handleUpdateGoal = (id: string, currentAmount: string) => {
		setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, currentAmount } : g)));
	};

	const handleDeleteGoal = (id: string) => {
		setGoals((prev) => prev.filter((g) => g.id !== id));
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Metas Financeiras</h3>

			<GoalForm onSubmit={handleSubmit} />

			<GoalList goals={goals} onUpdateGoal={handleUpdateGoal} onDeleteGoal={handleDeleteGoal} />
		</main>
	);
}
