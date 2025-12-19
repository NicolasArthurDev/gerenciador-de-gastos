import { Activity } from 'lucide-react';
import { useFinance } from '../../../contexts/useFinance';
import Card from './Card';
import CardHeader from './CardHeader';

export default function RecentActivityCard() {
	const { entries, expenses } = useFinance();

	const allTransactions = [
		...entries.map((e) => ({ ...e, type: 'income' as const })),
		...expenses.map((e) => ({ ...e, type: 'expense' as const })),
	]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	return (
		<Card colSpan="col-span-12 md:col-span-6 lg:col-span-4 row-span-2">
			<CardHeader
				title="Atividade Recente"
				icon={Activity}
				iconColor="text-cyan-400"
				titleSize="md"
				iconSize={20}
				mb="mb-3"
			/>
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
		</Card>
	);
}
