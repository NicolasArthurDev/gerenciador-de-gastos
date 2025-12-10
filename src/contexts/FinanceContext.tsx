import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Entry {
	id: string;
	description: string;
	amount: string;
	date: string;
}

export interface Expense {
	id: string;
	description: string;
	amount: string;
	date: string;
}

export interface Goal {
	id: string;
	description: string;
	targetAmount: string;
	currentAmount: string;
	deadline: string;
}

export interface FinanceContextType {
	entries: Entry[];
	expenses: Expense[];
	goals: Goal[];
	addEntry: (entry: Entry) => void;
	addExpense: (expense: Expense) => void;
	addGoal: (goal: Goal) => void;
	updateGoal: (id: string, currentAmount: string) => void;
	deleteEntry: (id: string) => void;
	deleteExpense: (id: string) => void;
	deleteGoal: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export { FinanceContext };

export function FinanceProvider({ children }: { children: ReactNode }) {
	const [entries, setEntries] = useState<Entry[]>(() => {
		const saved = localStorage.getItem('entries');
		return saved ? JSON.parse(saved) : [];
	});

	const [expenses, setExpenses] = useState<Expense[]>(() => {
		const saved = localStorage.getItem('expenses');
		return saved ? JSON.parse(saved) : [];
	});

	const [goals, setGoals] = useState<Goal[]>(() => {
		const saved = localStorage.getItem('goals');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('entries', JSON.stringify(entries));
	}, [entries]);

	useEffect(() => {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}, [expenses]);

	useEffect(() => {
		localStorage.setItem('goals', JSON.stringify(goals));
	}, [goals]);

	const addEntry = (entry: Entry) => {
		setEntries([...entries, entry]);
	};

	const addExpense = (expense: Expense) => {
		setExpenses([...expenses, expense]);
	};

	const deleteEntry = (id: string) => {
		setEntries(entries.filter((entry) => entry.id !== id));
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

	const deleteGoal = (id: string) => {
		setGoals(goals.filter((goal) => goal.id !== id));
	};

	return (
		<FinanceContext.Provider
			value={{
				entries,
				expenses,
				goals,
				addEntry,
				addExpense,
				addGoal,
				updateGoal,
				deleteEntry,
				deleteExpense,
				deleteGoal,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
}
