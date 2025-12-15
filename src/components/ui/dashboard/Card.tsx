import type { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
	colSpan?: string;
	rowSpan?: string;
}

export default function Card({
	children,
	className = '',
	colSpan = 'col-span-12',
	rowSpan = '',
}: CardProps) {
	const baseClasses =
		'bg-stone-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-stone-700';
	const gridClasses = `${colSpan} ${rowSpan}`.trim();

	return (
		<div className={`${gridClasses} ${baseClasses} ${className}`}>
			{children}
		</div>
	);
}
