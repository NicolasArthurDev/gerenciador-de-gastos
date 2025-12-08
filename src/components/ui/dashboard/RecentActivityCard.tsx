


import { Activity } from 'lucide-react';

export default function RecentActivityCard() {
	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 bg-stone-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center justify-between mb-3">
				<h4 className="text-white font-semibold truncate">Atividade Recente</h4>
				<Activity className="text-cyan-400 flex-shrink-0" size={20} />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between items-center p-2 bg-stone-700 rounded-lg gap-2">
					<span className="text-stone-300 text-sm truncate">Mercado</span>
					<span className="text-white font-medium whitespace-nowrap">-R$ 125,50</span>
				</div>
				<div className="flex justify-between items-center p-2 bg-stone-700 rounded-lg gap-2">
					<span className="text-stone-300 text-sm truncate">Salário</span>
					<span className="text-green-400 font-medium whitespace-nowrap">+R$ 5.000,00</span>
				</div>
				<div className="flex justify-between items-center p-2 bg-stone-700 rounded-lg gap-2">
					<span className="text-stone-300 text-sm truncate">Internet</span>
					<span className="text-white font-medium whitespace-nowrap">-R$ 99,90</span>
				</div>
			</div>
		</div>
	);
}
