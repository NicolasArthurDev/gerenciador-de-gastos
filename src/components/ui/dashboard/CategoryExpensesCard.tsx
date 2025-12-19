import { Tag } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';
import Card from './Card';
import CardHeader from './CardHeader';
import { useMemo } from 'react';
import type { ExpenseCategory } from '../../../contexts/FinanceContext';
import { calculateTotal } from '../../../utils/financeCalculations';

const categoryConfig = {
	necessarios: {
		label: 'Gastos Necessários',
		textColor: 'text-blue-400',
		bgColor: 'bg-blue-500',
	},
	variaveis: {
		label: 'Gastos Variáveis',
		textColor: 'text-purple-400',
		bgColor: 'bg-purple-500',
	},
	investimentos: {
		label: 'Investimentos',
		textColor: 'text-orange-400',
		bgColor: 'bg-orange-500',
	},
	diversao: {
		label: 'Diversão',
		textColor: 'text-green-400',
		bgColor: 'bg-green-500',
	},
} as const;

export default function CategoryExpensesCard() {
	const { expenses, entries, distribution } = useFinance();

	const expensesByCategory = useMemo(() => {
		const totals: Record<ExpenseCategory, number> = {
			necessarios: 0,
			variaveis: 0,
			investimentos: 0,
			diversao: 0,
		};

		expenses.forEach((expense) => {
			const category = expense.category || 'variaveis';
			totals[category] += parseFloat(expense.amount) || 0;
		});

		return totals;
	}, [expenses]);

	const totalEntries = useMemo(() => calculateTotal(entries), [entries]);

	const maxAmounts = useMemo(() => {
		return {
			necessarios: (totalEntries * (distribution.necessarios || 0)) / 100,
			variaveis: (totalEntries * (distribution.variaveis || 0)) / 100,
			investimentos:
				(totalEntries * (distribution.investimentos || 0)) / 100,
			diversao: (totalEntries * (distribution.diversao || 0)) / 100,
		};
	}, [totalEntries, distribution]);

	return (
		<Card colSpan="col-span-12 md:col-span-6 lg:col-span-4">
			<CardHeader
				title="Gastos por Categoria"
				icon={Tag}
				iconColor="text-cyan-400"
				titleSize="md"
				iconSize={20}
				mb="mb-3"
			/>
			<div className="space-y-3">
				{Object.entries(categoryConfig).map(([key, cfg]) => {
					const amount = expensesByCategory[key as ExpenseCategory];
					const maxAmount = maxAmounts[key as keyof typeof maxAmounts];
					const percentage =
						maxAmount > 0 ? Math.min((amount / maxAmount) * 100, 100) : 0;

					return (
						<div key={key} className="space-y-1">
							<div className="flex justify-between items-center">
								<span className="text-stone-300 text-sm">{cfg.label}</span>
								<span className={`font-semibold ${cfg.textColor}`}>
									R$ {amount.toFixed(2)}
								</span>
							</div>
							{maxAmount > 0 && (
								<>
									<div className="text-xs text-stone-400">
										Limite: R$ {maxAmount.toFixed(2)} ({percentage.toFixed(1)}%)
									</div>
									<div className="w-full bg-stone-700 rounded-full h-2">
										<div
											className={`${cfg.bgColor} h-2 rounded-full transition-all`}
											style={{ width: `${percentage}%` }}
										></div>
									</div>
								</>
							)}
						</div>
					);
				})}
				{Object.values(expensesByCategory).every((amount) => amount === 0) && (
					<p className="text-stone-400 text-sm text-center py-4">
						Nenhum gasto registrado
					</p>
				)}
			</div>
		</Card>
	);
}

