import { Calendar } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';
import Card from './Card';
import { formatCurrency } from '../../../utils/financeCalculations';

const calculateGoalsTotal = (
	goals: Array<{ targetAmount?: string; currentAmount?: string }>,
	field: 'targetAmount' | 'currentAmount',
): number => {
	return goals.reduce((sum, goal) => sum + parseFloat(goal[field] || '0'), 0);
};

const calculatePercentage = (current: number, target: number): number => {
	return target > 0 ? (current / target) * 100 : 0;
};

export default function SavingsGoalCard() {
	const { goals } = useFinance();

	const totalTarget = calculateGoalsTotal(goals, 'targetAmount');
	const totalCurrent = calculateGoalsTotal(goals, 'currentAmount');
	const percentage = calculatePercentage(totalCurrent, totalTarget);
	const activeGoals = goals.length;

	return (
		<Card
			colSpan="col-span-6 md:col-span-3 lg:col-span-2"
			className="bg-gradient-to-br from-blue-500 to-blue-700 border-0 p-6 select-none"
		>
			<div className="flex flex-col justify-between h-full">
				<div>
					<Calendar
						className="text-white opacity-80 mb-3"
						size={24}
					/>
					<p className="text-amber-100 text-sm mb-2 truncate">
						{activeGoals === 0
							? 'Nenhuma Meta'
							: activeGoals === 1
								? '1 Meta Ativa'
								: `${activeGoals} Metas Ativas`}
					</p>
					<p className="text-3xl font-bold text-white mb-4 truncate">
						{formatCurrency(totalCurrent)}
					</p>
					<p className="text-amber-100 text-xs truncate">
						de {formatCurrency(totalTarget)}
					</p>
				</div>
				<div>
					<div className="w-full bg-stone-800 rounded-full h-3 mb-2">
						<div
							className="bg-white h-3 rounded-full transition-all"
							style={{ width: `${Math.min(percentage, 100)}%` }}
						></div>
					</div>
					<p className="text-amber-100 text-xs">
						{percentage.toFixed(1)}% alcançado
					</p>
				</div>
			</div>
		</Card>
	);
}
