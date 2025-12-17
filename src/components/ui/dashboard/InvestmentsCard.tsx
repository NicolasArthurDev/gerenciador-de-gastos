import { TrendingUp } from 'lucide-react';
import Card from './Card';
import { useFinance } from '../../../contexts/useFinance';
import {
	formatCurrency,
	calculateInvestmentTotal,
} from '../../../utils/financeCalculations';

export default function InvestmentsCard() {
	const { expenses } = useFinance();
	const investmentTotal = calculateInvestmentTotal(expenses);

	return (
		<Card colSpan="col-span-6 md:col-span-3 lg:col-span-2">
			<div className="flex items-center gap-2 mb-3">
				<TrendingUp className="text-cyan-400 flex-shrink-0" size={20} />
				<span className="text-stone-300 text-sm truncate">
					Investimentos
				</span>
			</div>
			<p className="text-2xl font-bold text-white truncate">
				{formatCurrency(investmentTotal)}
			</p>
			<p className="text-stone-400 text-xs mt-1">Total investido</p>
		</Card>
	);
}
