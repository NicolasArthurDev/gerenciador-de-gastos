import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseAlertsCard from '../src/components/ui/dashboard/ExpenseAlertsCard';
import { FinanceContext } from '../src/contexts/FinanceContext';

const mockContextValue = {
	entries: [],
	expenses: [],
	goals: [],
	bills: [],
	distribution: {
		necessarios: 50,
		variaveis: 10,
		investimentos: 30,
		diversao: 10,
	},
	setEntries: () => {},
	setExpenses: () => {},
	setGoals: () => {},
	setBills: () => {},
	setDistribution: () => {},
};

describe('componente ExpenseAlertsCard', () => {
	it('deve exibir mensagem quando não há alertas', () => {
		render(
			<FinanceContext.Provider value={mockContextValue}>
				<ExpenseAlertsCard />
			</FinanceContext.Provider>,
		);
		expect(screen.getByText('✓ Tudo dentro do limite')).toBeInTheDocument();
		expect(
			screen.getByText(
				'Suas despesas estão dentro da distribuição configurada.',
			),
		).toBeInTheDocument();
	});

	it('deve exibir alerta quando gastos ultrapassam o limite', () => {
		const contextWithAlert = {
			...mockContextValue,
			entries: [
				{
					id: '1',
					description: 'Salário',
					amount: '10000',
					date: '2025-12-01',
				},
			],
			expenses: [
				{
					id: '1',
					description: 'Investimento',
					amount: '4000',
					date: '2025-12-01',
					category: 'investimentos' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithAlert}>
				<ExpenseAlertsCard />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('Investimentos')).toBeInTheDocument();
		expect(screen.getByText(/Ultrapassou o limite em/)).toBeInTheDocument();
	});

	it('deve calcular porcentagem correta baseada nas entradas', () => {
		const contextWithAlert = {
			...mockContextValue,
			entries: [
				{
					id: '1',
					description: 'Salário',
					amount: '10000',
					date: '2025-12-01',
				},
			],
			expenses: [
				{
					id: '1',
					description: 'Diversão',
					amount: '2000',
					date: '2025-12-01',
					category: 'diversao' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithAlert}>
				<ExpenseAlertsCard />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('Diversão')).toBeInTheDocument();
		expect(screen.getByText('20.00%')).toBeInTheDocument();
	});

	it('deve exibir limite configurado', () => {
		const contextWithAlert = {
			...mockContextValue,
			entries: [
				{
					id: '1',
					description: 'Salário',
					amount: '5000',
					date: '2025-12-01',
				},
			],
			expenses: [
				{
					id: '1',
					description: 'Gastos',
					amount: '3000',
					date: '2025-12-01',
					category: 'necessarios' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithAlert}>
				<ExpenseAlertsCard />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('50%')).toBeInTheDocument();
	});

	it('deve exibir valor gasto', () => {
		const contextWithAlert = {
			...mockContextValue,
			entries: [
				{
					id: '1',
					description: 'Salário',
					amount: '10000',
					date: '2025-12-01',
				},
			],
			expenses: [
				{
					id: '1',
					description: 'Gastos Variáveis',
					amount: '1500',
					date: '2025-12-01',
					category: 'variaveis' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithAlert}>
				<ExpenseAlertsCard />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('R$ 1500.00')).toBeInTheDocument();
	});

	it('não deve exibir alerta quando gastos estão dentro do limite', () => {
		const contextWithinLimit = {
			...mockContextValue,
			entries: [
				{
					id: '1',
					description: 'Salário',
					amount: '10000',
					date: '2025-12-01',
				},
			],
			expenses: [
				{
					id: '1',
					description: 'Investimento',
					amount: '2000',
					date: '2025-12-01',
					category: 'investimentos' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithinLimit}>
				<ExpenseAlertsCard />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('✓ Tudo dentro do limite')).toBeInTheDocument();
		expect(screen.queryByText('Investimentos')).not.toBeInTheDocument();
	});

	it('deve ordenar alertas por porcentagem (maior primeiro)', () => {
		const contextWithMultipleAlerts = {
			...mockContextValue,
			entries: [
				{
					id: '1',
					description: 'Salário',
					amount: '10000',
					date: '2025-12-01',
				},
			],
			expenses: [
				{
					id: '1',
					description: 'Investimento',
					amount: '4000',
					date: '2025-12-01',
					category: 'investimentos' as const,
				},
				{
					id: '2',
					description: 'Diversão',
					amount: '3000',
					date: '2025-12-01',
					category: 'diversao' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithMultipleAlerts}>
				<ExpenseAlertsCard />
			</FinanceContext.Provider>,
		);

		const categories = screen.getAllByRole('paragraph');
		const investimentosIndex = categories.findIndex((p) =>
			p.textContent?.includes('Investimentos'),
		);
		const diversaoIndex = categories.findIndex((p) =>
			p.textContent?.includes('Diversão'),
		);

		expect(investimentosIndex).toBeLessThan(diversaoIndex);
	});
});
