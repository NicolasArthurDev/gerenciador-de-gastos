import { AlertTriangle } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';
import Card from './Card';
import CardHeader from './CardHeader';
import { useMemo } from 'react';

const categoryConfig = {
	necessarios: { label: 'Gastos Necessários', color: 'text-blue-400' },
	variaveis: { label: 'Gastos Variáveis', color: 'text-purple-400' },
	investimentos: { label: 'Investimentos', color: 'text-orange-400' },
	diversao: { label: 'Diversão', color: 'text-green-400' },
} as const;

export default function ExpenseAlertsCard() {
	const { expenses, distribution, entries } = useFinance();

	const alerts = useMemo(() => {
		const totalEntries = entries.reduce(
			(sum, entry) => sum + parseFloat(entry.amount || '0'),
			0,
		);

		if (totalEntries === 0) return [];

		const categoryTotals: Record<keyof typeof categoryConfig, number> = {
			necessarios: 0,
			variaveis: 0,
			investimentos: 0,
			diversao: 0,
		};

		expenses.forEach((expense) => {
			categoryTotals[expense.category] += parseFloat(
				expense.amount || '0',
			);
		});

		const alertsList: Array<{
			category: keyof typeof categoryConfig;
			percentage: number;
			limit: number;
			amount: number;
			maxAmount: number;
		}> = [];

		Object.entries(categoryTotals).forEach(([key, amount]) => {
			const categoryKey = key as keyof typeof categoryConfig;
			const limit = distribution[categoryKey] || 0;
			const maxAmount = (totalEntries * limit) / 100;
			const percentage = (amount / totalEntries) * 100;

			if (amount > maxAmount) {
				alertsList.push({
					category: categoryKey,
					percentage: Math.round(percentage * 100) / 100,
					limit,
					amount,
					maxAmount,
				});
			}
		});

		return alertsList.sort((a, b) => b.percentage - a.percentage);
	}, [expenses, distribution, entries]);

	return (
		<Card colSpan="col-span-12 md:col-span-6 lg:col-span-4">
			<CardHeader
				title="Alertas de Distribuição"
				icon={AlertTriangle}
				iconColor="text-yellow-400"
				titleSize="md"
				iconSize={20}
				mb="mb-4"
			/>

			<div className="space-y-3">
				{alerts.length === 0 ? (
					<div className="text-center py-6">
						<p className="text-green-400 text-sm font-medium mb-2">
							✓ Tudo dentro do limite
						</p>
						<p className="text-stone-400 text-xs">
							Suas despesas estão dentro da distribuição
							configurada.
						</p>
					</div>
				) : (
					alerts.map((alert) => {
						const config = categoryConfig[alert.category];
						const excessAmount = alert.amount - alert.maxAmount;
						const excessPercentage =
							(excessAmount / alert.maxAmount) * 100;

						return (
							<div
								key={alert.category}
								className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
							>
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<p
											className={`font-semibold text-sm ${config.color} mb-1`}
										>
											{config.label}
										</p>
										<p className="text-stone-300 text-xs">
											Ultrapassou o limite em{' '}
											{excessPercentage.toFixed(2)}%
										</p>
									</div>
									<AlertTriangle
										className="text-yellow-400 flex-shrink-0"
										size={20}
									/>
								</div>
								<div className="space-y-1">
									<div className="flex justify-between text-xs">
										<span className="text-stone-400">
											Atual:
										</span>
										<span className="text-yellow-400 font-medium">
											{alert.percentage.toFixed(2)}%
										</span>
									</div>
									<div className="flex justify-between text-xs">
										<span className="text-stone-400">
											Limite:
										</span>
										<span className="text-stone-300">
											{alert.limit}%
										</span>
									</div>
									<div className="flex justify-between text-xs">
										<span className="text-stone-400">
											Valor:
										</span>
										<span className="text-white font-medium">
											R$ {alert.amount.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</Card>
	);
}
