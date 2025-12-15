interface BillItemProps {
	name: string;
	dueDate: string;
	amount: string;
	isUrgent?: boolean;
}

export default function BillItem({
	name,
	dueDate,
	amount,
	isUrgent = false,
}: BillItemProps) {
	return (
		<div className="flex justify-between items-center gap-3">
			<div className="min-w-0 flex-1">
				<p className="text-white text-sm font-medium truncate">{name}</p>
				<p className="text-stone-400 text-xs truncate">{dueDate}</p>
			</div>
			<span
				className={`font-medium whitespace-nowrap text-sm ${
					isUrgent ? 'text-yellow-400' : 'text-stone-300'
				}`}
			>
				{amount}
			</span>
		</div>
	);
}
