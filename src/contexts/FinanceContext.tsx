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
	category: ExpenseCategory;
}

export interface Goal {
	id: string;
	description: string;
	targetAmount: string;
	currentAmount: string;
	deadline: string;
}

export type BillType = 'parcelamento' | 'assinatura' | 'conta';

export interface Bill {
	id: string;
	description: string;
	amount: string;
	dueDate: string;
	type: BillType;
	totalInstallments?: number; // Para parcelamentos
	currentInstallment?: number; // Parcela atual
	isPaid: boolean;
}

export type ExpenseCategory =
	| 'necessarios'
	| 'variaveis'
	| 'investimentos'
	| 'diversao';

export interface ExpenseDistribution {
	necessarios: number;
	variaveis: number;
	investimentos: number;
	diversao: number;
}

interface FinanceContextType {
	entries: Entry[];
	expenses: Expense[];
	goals: Goal[];
	bills: Bill[];
	setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
	setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
	setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
	setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
	distribution: ExpenseDistribution;
	setDistribution: React.Dispatch<React.SetStateAction<ExpenseDistribution>>;
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
		const parsed = saved ? JSON.parse(saved) : [];
		return Array.isArray(parsed)
			? parsed.map((expense) => ({
					...expense,
					category: expense.category || 'variaveis',
				}))
			: [];
	});

	const [goals, setGoals] = useState<Goal[]>(() => {
		const saved = localStorage.getItem('goals');
		return saved ? JSON.parse(saved) : [];
	});

	const [bills, setBills] = useState<Bill[]>(() => {
		const saved = localStorage.getItem('bills');
		return saved ? JSON.parse(saved) : [];
	});

	const [distribution, setDistribution] = useState<ExpenseDistribution>(
		() => {
			const saved = localStorage.getItem('expenseDistribution');
			return saved
				? JSON.parse(saved)
				: {
						necessarios: 50,
						variaveis: 10,
						investimentos: 30,
						diversao: 10,
					};
		},
	);

	useEffect(() => {
		localStorage.setItem('entries', JSON.stringify(entries));
	}, [entries]);

	useEffect(() => {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}, [expenses]);

	useEffect(() => {
		localStorage.setItem('goals', JSON.stringify(goals));
	}, [goals]);

	useEffect(() => {
		localStorage.setItem('bills', JSON.stringify(bills));
	}, [bills]);

	useEffect(() => {
		localStorage.setItem(
			'expenseDistribution',
			JSON.stringify(distribution),
		);
	}, [distribution]);

	return (
		<FinanceContext.Provider
			value={{
				entries,
				expenses,
				goals,
				bills,
				setEntries,
				setExpenses,
				setGoals,
				setBills,
				distribution,
				setDistribution,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
}
