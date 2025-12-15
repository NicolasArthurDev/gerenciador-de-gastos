import { CreditCard } from 'lucide-react';
import Card from './Card';

export default function ActiveCardsCard() {
	return (
		<Card
			colSpan="col-span-12 md:col-span-6 lg:col-span-4"
			className="bg-gradient-to-br from-cyan-500 to-cyan-700 border-0 select-none"
		>
			<CreditCard className="text-white opacity-80 mb-2" size={24} />
			<p className="text-cyan-100 text-sm mb-1 truncate">Cartões Ativos</p>
			<p className="text-3xl font-bold text-white">4</p>
		</Card>
	);
}
