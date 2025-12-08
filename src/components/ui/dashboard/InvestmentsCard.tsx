

import { TrendingUp } from 'lucide-react';



export default function InvestmentsCard() {
	return (
		<div className="col-span-6 md:col-span-3 lg:col-span-2 bg-stone-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center gap-2 mb-3">
				<TrendingUp className="text-cyan-400 flex-shrink-0" size={20} />
				<span className="text-stone-300 text-sm truncate">Investimentos</span>
			</div>
			<p className="text-2xl font-bold text-white truncate">R$ 15.200</p>
			<p className="text-cyan-400 text-xs mt-1">+8,7%</p>
		</div>
	);
}
