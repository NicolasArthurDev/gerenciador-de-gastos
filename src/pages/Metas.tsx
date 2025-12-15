import { useState } from 'react';
import { useFinance } from '../contexts/useFinance';
import type { Goal } from '../contexts/FinanceContext';
import { GoalForm } from '../components/ui/metas';
import { GoalList } from '../components/ui/metas/golList';

export default function Metas() {
	const { goals, addGoal, updateGoal, updateGoalComplete, deleteGoal } =
		useFinance();
	const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

	const handleSubmit = (data: {
		description: string;
		targetAmount: string;
		deadline: string;
	}) => {
		if (editingGoal) {
			updateGoalComplete(editingGoal.id, {
				...editingGoal,
				description: data.description,
				targetAmount: data.targetAmount,
				deadline: data.deadline,
			});
			setEditingGoal(null);
		} else {
			addGoal({
				id: Date.now().toString(),
				description: data.description,
				targetAmount: data.targetAmount,
				currentAmount: '0',
				deadline: data.deadline,
			});
		}
	};

	const handleEdit = (goal: Goal) => {
		setEditingGoal(goal);
	};

	const handleCancel = () => {
		setEditingGoal(null);
	};

	const handleDelete = (id: string) => {
		deleteGoal(id);
		if (editingGoal?.id === id) {
			setEditingGoal(null);
		}
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">
				Metas Financeiras
			</h3>

			<GoalForm
				onSubmit={handleSubmit}
				initialData={
					editingGoal
						? {
								description: editingGoal.description,
								targetAmount: editingGoal.targetAmount,
								deadline: editingGoal.deadline,
							}
						: undefined
				}
				onCancel={handleCancel}
				isEditing={!!editingGoal}
			/>

			<GoalList
				goals={goals}
				onUpdateGoal={updateGoal}
				onDeleteGoal={handleDelete}
				onEditGoal={handleEdit}
			/>
		</main>
	);
}
