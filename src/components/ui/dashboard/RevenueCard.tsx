import { ArrowUpRight } from 'lucide-react';
import { useFinance } from '../../../contexts/FinanceContext';

export default function RevenueCard() {
	const { entries } = useFinance();

	const total = entries.reduce((sum, entry) => sum + parseFloat(entry.amount || '0'), 0);

	return (
		<div className="col-span-6 md:col-span-3 lg:col-span-2 bg-stone-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center gap-2 mb-3">
				<ArrowUpRight className="text-green-400 flex-shrink-0" size={20} />
				<span className="text-stone-300 text-sm truncate">Receitas</span>
			</div>
			<p className="text-2xl font-bold text-white truncate">R$ {total.toFixed(2)}</p>
			<p className="text-green-400 text-xs mt-1">{entries.length} entradas</p>
		</div>
	);
}
