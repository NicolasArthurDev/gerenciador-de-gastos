import type { Entry, Expense, Bill } from '../contexts/FinanceContext';

export const calculateTotal = (items: (Entry | Expense)[]): number => {
	return items.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
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

export const calculateInvestmentTotal = (expenses: Expense[]): number => {
	return expenses
		.filter((expense) => expense.category === 'investimentos')
		.reduce((sum, expense) => sum + parseFloat(expense.amount || '0'), 0);
};

export const getDaysUntilDue = (dueDate: string): number => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const due = new Date(dueDate);
	due.setHours(0, 0, 0, 0);
	const diffTime = due.getTime() - today.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getUpcomingBills = (bills: Bill[], limit = 3): Bill[] => {
	return bills
		.filter((bill) => !bill.isPaid && getDaysUntilDue(bill.dueDate) <= 30)
		.sort((a, b) => getDaysUntilDue(a.dueDate) - getDaysUntilDue(b.dueDate))
		.slice(0, limit);
};

export const formatDueDateText = (daysUntil: number): string => {
	if (daysUntil === 0) return 'Vence hoje';
	if (daysUntil === 1) return 'Vence amanhã';
	if (daysUntil < 0) return `Venceu há ${Math.abs(daysUntil)} dias`;
	return `Vence em ${daysUntil} dias`;
};
