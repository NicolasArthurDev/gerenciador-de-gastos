interface DistributionItemProps {
	label: string;
	percentage: number;
	color: string;
}

export default function DistributionItem({
	label,
	percentage,
	color,
}: DistributionItemProps) {
	return (
		<div>
			<div className="flex justify-between text-sm mb-1">
				<span className="text-stone-300 truncate">{label}</span>
				<span className="text-white font-medium ml-2">{percentage}%</span>
			</div>
			<div className="w-full bg-stone-700 rounded-full h-2">
				<div
					className={`${color} h-2 rounded-full transition-all`}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
}
