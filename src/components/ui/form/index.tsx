import { useState, useEffect } from 'react';
import type { ExpenseCategory } from '../../../contexts/FinanceContext';

interface BaseFormData {
	description: string;
	amount: string;
	date: string;
}

interface BaseFormProps {
	onSubmit: (data: BaseFormData) => void;
	initialData?: BaseFormData;
	onCancel?: () => void;
	isEditing?: boolean;
}

interface ExpenseFormProps {
	onSubmit: (data: BaseFormData & { category: ExpenseCategory }) => void;
	initialData?: BaseFormData & { category?: ExpenseCategory };
	onCancel?: () => void;
	isEditing?: boolean;
}

export function EntryForm({
	onSubmit,
	initialData,
	onCancel,
	isEditing = false,
}: BaseFormProps) {
	const [description, setDescription] = useState(
		initialData?.description || '',
	);
	const [amount, setAmount] = useState(initialData?.amount || '');
	const [date, setDate] = useState(initialData?.date || '');

	// Atualizar campos quando initialData mudar
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
				{isEditing ? 'Editar Entrada' : 'Adicionar Nova Entrada'}
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
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Ex: Salário"
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
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<button
						type="submit"
						className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
					>
						{isEditing ? 'Atualizar Entrada' : 'Adicionar Entrada'}
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

export function ExpenseForm({
	onSubmit,
	initialData,
	onCancel,
	isEditing = false,
}: ExpenseFormProps) {
	const [description, setDescription] = useState(
		initialData?.description || '',
	);
	const [amount, setAmount] = useState(initialData?.amount || '');
	const [date, setDate] = useState(initialData?.date || '');
	const [category, setCategory] = useState<ExpenseCategory>(
		initialData?.category || 'variaveis',
	);

	// Atualizar campos quando initialData mudar
	useEffect(() => {
		if (initialData) {
			setDescription(initialData.description);
			setAmount(initialData.amount);
			setDate(initialData.date);
			setCategory(initialData.category || 'variaveis');
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ description, amount, date, category });
		if (!isEditing) {
			setDescription('');
			setAmount('');
			setDate('');
			setCategory('variaveis');
		}
	};

	return (
		<div className="bg-stone-800 rounded-xl p-6 mb-6 border border-stone-700">
			<h4 className="text-white font-semibold text-lg mb-4">
				{isEditing ? 'Editar Despesa' : 'Adicionar Nova Despesa'}
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
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="Ex: Mercado"
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
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
						/>
					</div>
					<div>
						<label className="block text-stone-300 text-sm mb-2">
							Categoria
						</label>
						<select
							value={category}
							onChange={(e) =>
								setCategory(e.target.value as ExpenseCategory)
							}
							className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
							required
						>
							<option value="necessarios">
								Gastos Necessários
							</option>
							<option value="variaveis">Gastos Variáveis</option>
							{/* <option value="investimentos">Investimentos</option> */}
							<option value="diversao">Diversão</option>
						</select>
					</div>
				</div>
				<div className="flex gap-2">
					<button
						type="submit"
						className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
					>
						{isEditing ? 'Atualizar Despesa' : 'Adicionar Despesa'}
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

export default EntryForm;
