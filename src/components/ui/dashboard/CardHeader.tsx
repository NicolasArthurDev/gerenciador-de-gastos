import type { LucideIcon } from 'lucide-react';

interface CardHeaderProps {
	title: string;
	icon?: LucideIcon;
	iconColor?: string;
	titleSize?: 'sm' | 'md' | 'lg';
	iconSize?: number;
	mb?: string;
}

export default function CardHeader({
	title,
	icon: Icon,
	iconColor = 'text-stone-400',
	titleSize = 'lg',
	iconSize = 24,
	mb = 'mb-4',
}: CardHeaderProps) {
	const titleClasses = {
		sm: 'text-sm font-semibold',
		md: 'text-base font-semibold',
		lg: 'text-lg font-semibold',
	};

	return (
		<div className={`flex items-center justify-between ${mb}`}>
			<h3 className={`${titleClasses[titleSize]} text-white truncate`}>
				{title}
			</h3>
			{Icon && (
				<Icon
					className={`${iconColor} flex-shrink-0`}
					size={iconSize}
				/>
			)}
		</div>
	);
}
