import { useState } from 'react';

interface GoalFormProps {
	onSubmit: (data: {
		description: string;
		targetAmount: string;
		deadline: string;
	}) => void;
}

export function GoalForm({ onSubmit }: GoalFormProps) {
	const [description, setDescription] = useState('');
	const [targetAmount, setTargetAmount] = useState('');
	const [deadline, setDeadline] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!description || !targetAmount || !deadline) return;

		onSubmit({ description, targetAmount, deadline });
		setDescription('');
		setTargetAmount('');
		setDeadline('');
	};

	return (
		<div className="bg-stone-800 rounded-xl border border-stone-700 p-6 mb-6">
			<h4 className="text-white font-semibold mb-4">Nova Meta</h4>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-stone-300 text-sm mb-2">
						Descrição da Meta
					</label>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full bg-stone-700 text-white rounded-lg px-4 py-2 border border-stone-600 focus:border-purple-500 focus:outline-none"
						placeholder="Ex: Viagem de férias"
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-stone-300 text-sm mb-2">
							Valor Alvo
						</label>
						<input
							type="number"
							step="0.01"
							value={targetAmount}
							onChange={(e) => setTargetAmount(e.target.value)}
							className="w-full bg-stone-700 text-white rounded-lg px-4 py-2 border border-stone-600 focus:border-purple-500 focus:outline-none"
							placeholder="0.00"
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">
							Data Limite
						</label>
						<input
							type="date"
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
							className="w-full bg-stone-700 text-white rounded-lg px-4 py-2 border border-stone-600 focus:border-purple-500 focus:outline-none"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
				>
					Adicionar Meta
				</button>
			</form>
		</div>
	);
}
