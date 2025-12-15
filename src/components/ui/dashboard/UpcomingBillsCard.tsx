import { Calendar } from 'lucide-react';
import Card from './Card';
import CardHeader from './CardHeader';
import BillItem from './BillItem';

interface Bill {
	name: string;
	dueDate: string;
	amount: string;
	isUrgent?: boolean;
}

const upcomingBills: Bill[] = [
	{ name: 'Aluguel', dueDate: 'Vence em 5 dias', amount: 'R$ 1.200,00', isUrgent: true },
	{ name: 'Energia', dueDate: 'Vence em 12 dias', amount: 'R$ 180,00' },
	{ name: 'Internet', dueDate: 'Vence em 18 dias', amount: 'R$ 99,90' },
];

export default function UpcomingBillsCard() {
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
				{upcomingBills.map((bill) => (
					<BillItem
						key={bill.name}
						name={bill.name}
						dueDate={bill.dueDate}
						amount={bill.amount}
						isUrgent={bill.isUrgent}
					/>
				))}
			</div>
		</Card>
	);
}
