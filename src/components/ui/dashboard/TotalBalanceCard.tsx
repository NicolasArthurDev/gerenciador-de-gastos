

import { DollarSign, TrendingUp } from 'lucide-react';

export default function TotalBalanceCard() {
	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
			<div className="flex flex-col justify-between h-full">
				<div className="flex items-center justify-between">
					<span className="text-rose-100 text-sm font-medium select-none">Saldo Total</span>
					<DollarSign className="text-white opacity-80" size={24} />
				</div>
				<div>
					<h2 className="text-4xl font-bold text-white mb-2 select-none">R$ 12.450,00</h2>
					<div className="flex items-center gap-2 text-emerald-200">
						<TrendingUp size={16} />
						<span className="text-sm select-none">+12,5% este mês</span>
					</div>
				</div>
			</div>
		</div>
	);
}
