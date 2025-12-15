import type { Entry, Expense } from '../contexts/FinanceContext';

export const calculateTotal = (
	items: (Entry | Expense)[],
): number => {
	return items.reduce(
		(sum, item) => sum + parseFloat(item.amount || '0'),
		0,
	);
};

export const formatCurrency = (value: number): string => {
	return `R$ ${value.toFixed(2)}`;
};

export const calculateBalance = (
	entries: Entry[],
	expenses: Expense[],
): number => {
	const totalIncome = calculateTotal(entries);
	const totalExpense = calculateTotal(expenses);
	return totalIncome - totalExpense;
};
