import { ArrowUpRight } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';
import Card from './Card';
import { calculateTotal, formatCurrency } from '../../../utils/financeCalculations';

export default function RevenueCard() {
	const { entries } = useFinance();

	const total = calculateTotal(entries);

	return (
		<Card colSpan="col-span-6 md:col-span-3 lg:col-span-2">
			<div className="flex items-center gap-2 mb-3">
				<ArrowUpRight className="text-green-400 flex-shrink-0" size={20} />
				<span className="text-stone-300 text-sm truncate">Receitas</span>
			</div>
			<p className="text-2xl font-bold text-white truncate">
				{formatCurrency(total)}
			</p>
			<p className="text-green-400 text-xs mt-1">{entries.length} entradas</p>
		</Card>
	);
}
