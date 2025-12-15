import { Calendar } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';

export default function SavingsGoalCard() {
	const { goals } = useFinance();

	const totalTarget = goals.reduce(
		(sum, goal) => sum + parseFloat(goal.targetAmount || '0'),
		0,
	);
	const totalCurrent = goals.reduce(
		(sum, goal) => sum + parseFloat(goal.currentAmount || '0'),
		0,
	);
	const percentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
	const activeGoals = goals.length;

	return (
		<div className="col-span-6 md:col-span-3 lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow select-none">
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
						R$ {totalCurrent.toFixed(2)}
					</p>
					<p className="text-amber-100 text-xs truncate">
						de R$ {totalTarget.toFixed(2)}
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
		</div>
	);
}
