import type { LucideIcon } from 'lucide-react';

interface ExchangeRateItemProps {
	icon: LucideIcon;
	iconColor: string;
	label: string;
	value: number | null;
	formatter?: (value: number) => string;
}

export default function ExchangeRateItem({
	icon: Icon,
	iconColor,
	label,
	value,
	formatter,
}: ExchangeRateItemProps) {
	return (
		<div className="flex items-center justify-between p-3 bg-stone-700/50 rounded-lg">
			<div className="flex items-center gap-2">
				<Icon className={iconColor} size={20} />
				<span className="text-stone-300 text-sm">{label}</span>
			</div>
			{value !== null ? (
				<span className="text-white font-semibold">
					{formatter ? formatter(value) : value.toFixed(2)}
				</span>
			) : (
				<span className="text-stone-500 text-sm">N/A</span>
			)}
		</div>
	);
}
