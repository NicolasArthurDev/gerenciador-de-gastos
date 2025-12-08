


import { TrendingDown } from 'lucide-react';

export default function ExpensesCard() {
	return (
		<div className="col-span-6 md:col-span-3 lg:col-span-2 bg-stone-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center gap-2 mb-3">
				<TrendingDown className="text-red-400 flex-shrink-0" size={20} />
				<span className="text-stone-300 text-sm truncate">Despesas</span>
			</div>
			<p className="text-2xl font-bold text-white truncate">R$ 3.250</p>
			<p className="text-red-400 text-xs mt-1">-2,1%</p>
		</div>
	);
}
