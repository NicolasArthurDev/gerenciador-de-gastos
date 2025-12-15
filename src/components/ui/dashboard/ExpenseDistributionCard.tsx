import { PieChart } from 'lucide-react';
import Card from './Card';
import CardHeader from './CardHeader';
import DistributionItem from './DistributionItem';

const distributions = [
	{ label: 'Gastos Necessários', percentage: 50, color: 'bg-blue-500' },
	{ label: 'Gastos Variáveis', percentage: 10, color: 'bg-purple-500' },
	{ label: 'Investimentos', percentage: 30, color: 'bg-orange-500' },
	{ label: 'Diversão', percentage: 10, color: 'bg-green-500' },
];

export default function ExpenseDistributionCard() {
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
				{distributions.map((dist) => (
					<DistributionItem
						key={dist.label}
						label={dist.label}
						percentage={dist.percentage}
						color={dist.color}
					/>
				))}
			</div>
		</Card>
	);
}
