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

interface FinanceContextType {
	entries: Entry[];
	expenses: Expense[];
	goals: Goal[];
	setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
	setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
	setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
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

	return (
		<FinanceContext.Provider
			value={{
				entries,
				expenses,
				goals,
				setEntries,
				setExpenses,
				setGoals,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
}
