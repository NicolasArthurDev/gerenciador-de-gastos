

import { Calendar } from 'lucide-react';

export default function UpcomingBillsCard() {
	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 bg-stone-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center justify-between mb-3">
				<h4 className="text-white font-semibold truncate">Próximas Contas</h4>
				<Calendar className="text-yellow-400 flex-shrink-0" size={20} />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between items-center gap-3">
					<div className="min-w-0 flex-1">
						<p className="text-white text-sm font-medium truncate">Aluguel</p>
						<p className="text-stone-400 text-xs truncate">Vence em 5 dias</p>
					</div>
					<span className="text-yellow-400 font-medium whitespace-nowrap text-sm">R$ 1.200,00</span>
				</div>
				<div className="flex justify-between items-center gap-3">
					<div className="min-w-0 flex-1">
						<p className="text-white text-sm font-medium truncate">Energia</p>
						<p className="text-stone-400 text-xs truncate">Vence em 12 dias</p>
					</div>
					<span className="text-stone-300 font-medium whitespace-nowrap text-sm">R$ 180,00</span>
				</div>
				<div className="flex justify-between items-center gap-3">
					<div className="min-w-0 flex-1">
						<p className="text-white text-sm font-medium truncate">Internet</p>
						<p className="text-stone-400 text-xs truncate">Vence em 18 dias</p>
					</div>
					<span className="text-stone-300 font-medium whitespace-nowrap text-sm">R$ 99,90</span>
				</div>
			</div>
		</div>
	);
}
