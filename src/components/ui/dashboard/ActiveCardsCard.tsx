import { CreditCard } from 'lucide-react';

export default function ActiveCardsCard() {
	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow select-none">
			<CreditCard className="text-white opacity-80 mb-2" size={24} />
			<p className="text-cyan-100 text-sm mb-1 truncate">
				Cartões Ativos
			</p>
			<p className="text-3xl font-bold text-white">4</p>
		</div>
	);
}
