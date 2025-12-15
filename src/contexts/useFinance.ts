import { useContext } from 'react';
import type { Entry, Expense, Goal } from './FinanceContext';
import { FinanceContext } from './FinanceContext';

export function useFinance() {
	const context = useContext(FinanceContext);
	if (!context) {
		throw new Error('useFinance must be used within FinanceProvider');
	}

	const { entries, expenses, goals, setEntries, setExpenses, setGoals } =
		context;

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
		setGoals(
			goals.map((goal) => (goal.id === id ? updatedGoal : goal)),
		);
	};

	const deleteGoal = (id: string) => {
		setGoals(goals.filter((goal) => goal.id !== id));
	};

	return {
		entries,
		expenses,
		goals,
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
	};
}
