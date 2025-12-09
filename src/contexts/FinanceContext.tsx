import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Entry {
	id: string;
	description: string;
	amount: string;
	date: string;
}

interface Expense {
	id: string;
	description: string;
	amount: string;
	date: string;
}

interface FinanceContextType {
	entries: Entry[];
	expenses: Expense[];
	addEntry: (entry: Entry) => void;
	addExpense: (expense: Expense) => void;
	deleteEntry: (id: string) => void;
	deleteExpense: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
	const [entries, setEntries] = useState<Entry[]>(() => {
		const saved = localStorage.getItem('entries');
		return saved ? JSON.parse(saved) : [];
	});

	const [expenses, setExpenses] = useState<Expense[]>(() => {
		const saved = localStorage.getItem('expenses');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('entries', JSON.stringify(entries));
	}, [entries]);

	useEffect(() => {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}, [expenses]);

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

	return (
		<FinanceContext.Provider
			value={{
				entries,
				expenses,
				addEntry,
				addExpense,
				deleteEntry,
				deleteExpense,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
}

export function useFinance() {
	const context = useContext(FinanceContext);
	if (!context) {
		throw new Error('useFinance must be used within FinanceProvider');
	}
	return context;
}
