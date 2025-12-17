import { useState, useEffect } from 'react';

interface InvestmentFormData {
	description: string;
	amount: string;
	date: string;
}

interface InvestmentFormProps {
	onSubmit: (data: InvestmentFormData) => void;
	initialData?: InvestmentFormData;
	onCancel?: () => void;
	isEditing?: boolean;
}

export function InvestmentForm({
	onSubmit,
	initialData,
	onCancel,
	isEditing = false,
}: InvestmentFormProps) {
	const [description, setDescription] = useState(
		initialData?.description || '',
	);
	const [amount, setAmount] = useState(initialData?.amount || '');
	const [date, setDate] = useState(initialData?.date || '');

	useEffect(() => {
		if (initialData) {
			setDescription(initialData.description);
			setAmount(initialData.amount);
			setDate(initialData.date);
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ description, amount, date });
		if (!isEditing) {
			setDescription('');
			setAmount('');
			setDate('');
		}
	};

	return (
		<div className="bg-stone-800 rounded-xl p-6 mb-6 border border-stone-700">
			<h4 className="text-white font-semibold text-lg mb-4">
				{isEditing
					? 'Editar Investimento'
					: 'Adicionar Novo Investimento'}
			</h4>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-stone-300 text-sm mb-2">
							Descrição
						</label>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
							placeholder="Ex: Tesouro Direto"
							required
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">
							Valor (R$)
						</label>
						<input
							type="number"
							step="0.01"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
							placeholder="0.00"
							required
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">
							Data (opcional)
						</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<button
						type="submit"
						className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
					>
						{isEditing
							? 'Atualizar Investimento'
							: 'Adicionar Investimento'}
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
