interface DistributionItemProps {
	label: string;
	percentage: number;
	color: string;
	maxAmount?: number;
}

export default function DistributionItem({
	label,
	percentage,
	color,
	maxAmount,
}: DistributionItemProps) {
	return (
		<div>
			<div className="flex justify-between text-sm mb-1">
				<span className="text-stone-300 truncate">{label}</span>
				<span className="text-white font-medium ml-2">{percentage}%</span>
			</div>
			{maxAmount !== undefined && (
				<div className="text-xs text-stone-400 mb-1">
					Máximo: R$ {maxAmount.toFixed(2)}
				</div>
			)}
			<div className="w-full bg-stone-700 rounded-full h-2">
				<div
					className={`${color} h-2 rounded-full transition-all`}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
}

