import { Activity } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';

export default function RecentActivityCard() {
	const { entries, expenses } = useFinance();

	const allTransactions = [
		...entries.map((e) => ({ ...e, type: 'income' as const })),
		...expenses.map((e) => ({ ...e, type: 'expense' as const })),
	]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 bg-stone-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center justify-between mb-3">
				<h4 className="text-white font-semibold truncate">
					Atividade Recente
				</h4>
				<Activity className="text-cyan-400 flex-shrink-0" size={20} />
			</div>
			<div className="space-y-2">
				{allTransactions.length === 0 ? (
					<p className="text-stone-400 text-sm text-center py-4">
						Nenhuma transação ainda
					</p>
				) : (
					allTransactions.map((transaction) => (
						<div
							key={transaction.id}
							className="flex justify-between items-center p-2 bg-stone-700 rounded-lg gap-2"
						>
							<span className="text-stone-300 text-sm truncate">
								{transaction.description}
							</span>
							<span
								className={`font-medium whitespace-nowrap ${
									transaction.type === 'income'
										? 'text-green-400'
										: 'text-red-400'
								}`}
							>
								{transaction.type === 'income' ? '+' : '-'}R${' '}
								{parseFloat(transaction.amount).toFixed(2)}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}
