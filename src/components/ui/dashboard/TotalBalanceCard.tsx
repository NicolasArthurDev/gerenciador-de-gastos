import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface Entry {
	id: string;
	description: string;
	amount: string;
	date: string;
}

interface Expense {
	id: string;
	description: string;
	amount: string;
	date: string;
}

export default function TotalBalanceCard() {
	const [entries, setEntries] = useState<Entry[]>([]);
	const [expenses, setExpenses] = useState<Expense[]>([]);

	useEffect(() => {
		const savedEntries = localStorage.getItem('entries');
		const savedExpenses = localStorage.getItem('expenses');
		setEntries(savedEntries ? JSON.parse(savedEntries) : []);
		setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);
	}, []);

	const totalIncome = entries.reduce((sum, entry) => sum + parseFloat(entry.amount || '0'), 0);
	const totalExpense = expenses.reduce(
		(sum, expense) => sum + parseFloat(expense.amount || '0'),
		0
	);
	const balance = totalIncome - totalExpense;

	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
			<div className="flex flex-col justify-between h-full">
				<div className="flex items-center justify-between">
					<span className="text-emerald-100 text-sm font-medium select-none">
						Saldo Total
					</span>
					<DollarSign className="text-white opacity-80" size={24} />
				</div>
				<div>
					<h2 className="text-4xl font-bold text-white mb-2 select-none">
						R$ {balance.toFixed(2)}
					</h2>
					<div className="flex items-center gap-2 text-emerald-100">
						<TrendingUp size={16} />
						<span className="text-sm select-none">
							{entries.length} entradas, {expenses.length} despesas
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
