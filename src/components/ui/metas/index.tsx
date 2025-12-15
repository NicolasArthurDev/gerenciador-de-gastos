import { useState, useEffect } from 'react';

interface GoalFormProps {
	onSubmit: (data: {
		description: string;
		targetAmount: string;
		deadline: string;
	}) => void;
	initialData?: {
		description: string;
		targetAmount: string;
		deadline: string;
	};
	onCancel?: () => void;
	isEditing?: boolean;
}

export function GoalForm({
	onSubmit,
	initialData,
	onCancel,
	isEditing = false,
}: GoalFormProps) {
	const [description, setDescription] = useState(
		initialData?.description || '',
	);
	const [targetAmount, setTargetAmount] = useState(
		initialData?.targetAmount || '',
	);
	const [deadline, setDeadline] = useState(initialData?.deadline || '');

	// Atualizar campos quando initialData mudar
	useEffect(() => {
		if (initialData) {
			setDescription(initialData.description);
			setTargetAmount(initialData.targetAmount);
			setDeadline(initialData.deadline);
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!description || !targetAmount || !deadline) return;

		onSubmit({ description, targetAmount, deadline });
		if (!isEditing) {
			setDescription('');
			setTargetAmount('');
			setDeadline('');
		}
	};

	return (
		<div className="bg-stone-800 rounded-xl border border-stone-700 p-6 mb-6">
			<h4 className="text-white font-semibold mb-4">
				{isEditing ? 'Editar Meta' : 'Nova Meta'}
			</h4>
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
						required
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
							required
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
							required
						/>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="submit"
						className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
					>
						{isEditing ? 'Atualizar Meta' : 'Adicionar Meta'}
					</button>
					{isEditing && onCancel && (
						<button
							type="button"
							onClick={onCancel}
							className="bg-stone-600 hover:bg-stone-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
						>
							Cancelar
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
