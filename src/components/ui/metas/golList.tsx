import { useState } from 'react';

interface Goal {
	id: string;
	description: string;
	targetAmount: string;
	currentAmount: string;
	deadline: string;
}

interface GoalListProps {
	goals: Goal[];
	onUpdateGoal: (id: string, currentAmount: string) => void;
	onDeleteGoal: (id: string) => void;
	onEditGoal?: (goal: Goal) => void;
}

export function GoalList({
	goals,
	onUpdateGoal,
	onDeleteGoal,
	onEditGoal,
}: GoalListProps) {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editAmount, setEditAmount] = useState('');

	const handleUpdateAmount = (id: string) => {
		if (!editAmount) return;
		onUpdateGoal(id, editAmount);
		setEditingId(null);
		setEditAmount('');
	};

	const calculatePercentage = (current: string, target: string) => {
		const currentNum = parseFloat(current);
		const targetNum = parseFloat(target);
		if (targetNum === 0) return 0;
		return Math.min((currentNum / targetNum) * 100, 100);
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{goals.length === 0 ? (
				<div className="col-span-full bg-stone-800 rounded-xl border border-stone-700 p-8 text-center text-stone-400">
					Nenhuma meta financeira criada ainda.
				</div>
			) : (
				goals.map((goal) => {
					const percentage = calculatePercentage(
						goal.currentAmount,
						goal.targetAmount,
					);
					const current = parseFloat(goal.currentAmount);
					const target = parseFloat(goal.targetAmount);
					const remaining = target - current;
					const isCompleted = percentage >= 100;

					return (
						<div
							key={goal.id}
							className={`bg-stone-800 rounded-xl border ${
								isCompleted
									? 'border-green-500'
									: 'border-stone-700'
							} p-6 hover:bg-stone-750 transition-colors`}
						>
							<div className="flex justify-between items-start mb-4">
								<div className="flex-1">
									<h5 className="text-white font-semibold text-lg mb-1">
										{goal.description}
									</h5>
									<p className="text-stone-400 text-sm">
										Prazo:{' '}
										{new Date(
											goal.deadline,
										).toLocaleDateString('pt-BR')}
									</p>
								</div>
								{isCompleted && (
									<span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
										Concluída
									</span>
								)}
							</div>

							<div className="mb-4">
								<div className="flex justify-between text-sm mb-2">
									<span className="text-stone-300">
										R${' '}
										{parseFloat(goal.currentAmount).toFixed(
											2,
										)}
									</span>
									<span className="text-stone-300">
										R${' '}
										{parseFloat(goal.targetAmount).toFixed(
											2,
										)}
									</span>
								</div>
								<div className="w-full bg-stone-700 rounded-full h-3">
									<div
										className={`h-3 rounded-full transition-all ${
											isCompleted
												? 'bg-green-500'
												: 'bg-amber-500'
										}`}
										style={{ width: `${percentage}%` }}
									></div>
								</div>
								<p className="text-stone-400 text-xs mt-2">
									{percentage.toFixed(1)}% alcançado
									{!isCompleted &&
										` • Faltam R$ ${remaining.toFixed(2)}`}
								</p>
							</div>

							<div className="space-y-2">
								{editingId === goal.id ? (
									<div className="flex gap-2">
										<input
											type="number"
											step="0.01"
											value={editAmount}
											onChange={(e) =>
												setEditAmount(e.target.value)
											}
											className="flex-1 bg-stone-700 text-white rounded-lg px-3 py-2 border border-stone-600 focus:border-amber-500 focus:outline-none text-sm"
											placeholder="Novo valor atual"
										/>
										<button
											onClick={() =>
												handleUpdateAmount(goal.id)
											}
											className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
										>
											Salvar
										</button>
										<button
											onClick={() => {
												setEditingId(null);
												setEditAmount('');
											}}
											className="bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
										>
											Cancelar
										</button>
									</div>
								) : (
									<div className="flex flex-col gap-2">
										<div className="flex gap-2">
											<button
												onClick={() => {
													setEditingId(goal.id);
													setEditAmount(
														goal.currentAmount,
													);
												}}
												className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm transition-colors"
											>
												Atualizar Progresso
											</button>
											{onEditGoal && (
												<button
													onClick={() =>
														onEditGoal(goal)
													}
													className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
												>
													Editar
												</button>
											)}
											<button
												onClick={() =>
													onDeleteGoal(goal.id)
												}
												className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
											>
												Remover
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}
