import { Calendar } from 'lucide-react';
import Card from './Card';
import CardHeader from './CardHeader';
import BillItem from './BillItem';
import { useFinance } from '../../../contexts/useFinance';
import {
	formatCurrency,
	getUpcomingBills,
	getDaysUntilDue,
	formatDueDateText,
} from '../../../utils/financeCalculations';

export default function UpcomingBillsCard() {
	const { bills } = useFinance();
	const upcomingBills = getUpcomingBills(bills);

	return (
		<Card colSpan="col-span-12 md:col-span-6 lg:col-span-4">
			<CardHeader
				title="Próximas Contas"
				icon={Calendar}
				iconColor="text-yellow-400"
				titleSize="md"
				iconSize={20}
				mb="mb-3"
			/>
			<div className="space-y-2">
				{upcomingBills.length === 0 ? (
					<p className="text-stone-400 text-sm text-center py-4">
						Nenhuma conta próxima
					</p>
				) : (
					upcomingBills.map((bill) => {
						const daysUntil = getDaysUntilDue(bill.dueDate);
						const isUrgent = daysUntil <= 7;
						const dueDateText = formatDueDateText(daysUntil);

						return (
							<BillItem
								key={bill.id}
								name={bill.description}
								dueDate={dueDateText}
								amount={formatCurrency(parseFloat(bill.amount))}
								isUrgent={isUrgent}
							/>
						);
					})
				)}
			</div>
		</Card>
	);
}
