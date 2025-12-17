import { PieChart } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';
import Card from './Card';
import CardHeader from './CardHeader';
import DistributionItem from './DistributionItem';
import { calculateTotal } from '../../../utils/financeCalculations';
import { useMemo } from 'react';

const categoryConfig = {
	necessarios: { label: 'Gastos Necessários', color: 'bg-blue-500' },
	variaveis: { label: 'Gastos Variáveis', color: 'bg-purple-500' },
	investimentos: { label: 'Investimentos', color: 'bg-orange-500' },
	diversao: { label: 'Diversão', color: 'bg-green-500' },
} as const;

export default function ExpenseDistributionCard() {
	const { distribution, entries } = useFinance();

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
		<Card
			colSpan="col-span-12 md:col-span-6 lg:col-span-4"
			rowSpan="row-span-1"
			className="p-6"
		>
			<CardHeader
				title="Distribuição de Gastos"
				icon={PieChart}
				iconColor="text-blue-400"
				titleSize="md"
				iconSize={20}
			/>

			<div className="space-y-4 overflow-hidden">
				{Object.entries(categoryConfig).map(([key, cfg]) => (
					<DistributionItem
						key={key}
						label={cfg.label}
						percentage={
							distribution[key as keyof typeof distribution]
						}
						color={cfg.color}
						maxAmount={maxAmounts[key as keyof typeof maxAmounts]}
					/>
				))}
			</div>
		</Card>
	);
}
