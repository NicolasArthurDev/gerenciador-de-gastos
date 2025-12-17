import { useContext } from 'react';
import type {
	Entry,
	Expense,
	Goal,
	Bill,
	ExpenseDistribution,
} from './FinanceContext';
import { FinanceContext } from './FinanceContext';

export function useFinance() {
	const context = useContext(FinanceContext);
	if (!context) {
		throw new Error('useFinance must be used within FinanceProvider');
	}

	const {
		entries,
		expenses,
		goals,
		bills,
		distribution,
		setEntries,
		setExpenses,
		setGoals,
		setBills,
		setDistribution,
	} = context;

	const addEntry = (entry: Entry) => {
		setEntries([...entries, entry]);
	};

	const addExpense = (expense: Expense) => {
		setExpenses([...expenses, expense]);
	};

	const updateEntry = (id: string, updatedEntry: Entry) => {
		setEntries(
			entries.map((entry) => (entry.id === id ? updatedEntry : entry)),
		);
	};

	const deleteEntry = (id: string) => {
		setEntries(entries.filter((entry) => entry.id !== id));
	};

	const updateExpense = (id: string, updatedExpense: Expense) => {
		setExpenses(
			expenses.map((expense) =>
				expense.id === id ? updatedExpense : expense,
			),
		);
	};

	const deleteExpense = (id: string) => {
		setExpenses(expenses.filter((expense) => expense.id !== id));
	};

	const addGoal = (goal: Goal) => {
		setGoals([...goals, goal]);
	};

	const updateGoal = (id: string, currentAmount: string) => {
		setGoals(
			goals.map((goal) =>
				goal.id === id ? { ...goal, currentAmount } : goal,
			),
		);
	};

	const updateGoalComplete = (id: string, updatedGoal: Goal) => {
		setGoals(goals.map((goal) => (goal.id === id ? updatedGoal : goal)));
	};

	const deleteGoal = (id: string) => {
		setGoals(goals.filter((goal) => goal.id !== id));
	};

	const updateDistribution = (nextDistribution: ExpenseDistribution) => {
		setDistribution(nextDistribution);
	};

	const addBill = (bill: Bill) => {
		setBills([...bills, bill]);
	};

	const updateBill = (id: string, updatedBill: Bill) => {
		setBills(bills.map((bill) => (bill.id === id ? updatedBill : bill)));
	};

	const deleteBill = (id: string) => {
		setBills(bills.filter((bill) => bill.id !== id));
	};

	const toggleBillPaid = (id: string) => {
		setBills(
			bills.map((bill) =>
				bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill,
			),
		);
	};

	return {
		entries,
		expenses,
		goals,
		bills,
		distribution,
		addEntry,
		updateEntry,
		addExpense,
		updateExpense,
		addGoal,
		updateGoal,
		updateGoalComplete,
		deleteEntry,
		deleteExpense,
		deleteGoal,
		addBill,
		updateBill,
		deleteBill,
		toggleBillPaid,
		updateDistribution,
	};
}
