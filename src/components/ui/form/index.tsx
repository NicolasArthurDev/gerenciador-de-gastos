

import { useState } from 'react';

interface BaseFormProps {
	onSubmit: (data: { description: string; amount: string; date: string }) => void;
}

export function EntryForm({ onSubmit }: BaseFormProps) {
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ description, amount, date });
		setDescription('');
		setAmount('');
		setDate('');
	};

	return (
		<div className="bg-stone-800 rounded-xl p-6 mb-6 border border-stone-700">
			<h4 className="text-white font-semibold text-lg mb-4">Adicionar Nova Entrada</h4>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-stone-300 text-sm mb-2">Descrição</label>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Ex: Salário"
							required
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">Valor (R$)</label>
						<input
							type="number"
							step="0.01"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="0.00"
							required
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">Data</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
				>
					Adicionar Entrada
				</button>
			</form>
		</div>
	);
}

export function ExpenseForm({ onSubmit }: BaseFormProps) {
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ description, amount, date });
		setDescription('');
		setAmount('');
		setDate('');
	};

	return (
		<div className="bg-stone-800 rounded-xl p-6 mb-6 border border-stone-700">
			<h4 className="text-white font-semibold text-lg mb-4">Adicionar Nova Despesa</h4>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-stone-300 text-sm mb-2">Descrição</label>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="Ex: Mercado"
							required
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">Valor (R$)</label>
						<input
							type="number"
							step="0.01"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="0.00"
							required
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">Data</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
							required
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
				>
					Adicionar Despesa
				</button>
			</form>
		</div>
	);
}

export default EntryForm;