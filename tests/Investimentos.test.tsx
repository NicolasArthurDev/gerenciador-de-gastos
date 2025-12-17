import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Investimentos from '../src/pages/Investimentos';
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
	setEntries: vi.fn(),
	setExpenses: vi.fn(),
	setGoals: vi.fn(),
	setBills: vi.fn(),
	setDistribution: vi.fn(),
};

describe('página Investimentos', () => {
	it('deve exibir mensagem quando não há investimentos', () => {
		render(
			<FinanceContext.Provider value={mockContextValue}>
				<Investimentos />
			</FinanceContext.Provider>,
		);
		expect(
			screen.getByText('Nenhum investimento registrado ainda.'),
		).toBeInTheDocument();
	});

	it('deve renderizar investimentos existentes', () => {
		const contextWithInvestments = {
			...mockContextValue,
			expenses: [
				{
					id: '1',
					description: 'Tesouro Direto',
					amount: '1000',
					date: '2025-12-01',
					category: 'investimentos' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithInvestments}>
				<Investimentos />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('Tesouro Direto')).toBeInTheDocument();
		expect(screen.getByText('R$ 1000.00')).toBeInTheDocument();
	});

	it('deve renderizar botões de editar e remover', () => {
		const contextWithInvestments = {
			...mockContextValue,
			expenses: [
				{
					id: '1',
					description: 'Ações',
					amount: '500',
					date: '2025-12-01',
					category: 'investimentos' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithInvestments}>
				<Investimentos />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('Editar')).toBeInTheDocument();
		expect(screen.getByText('Remover')).toBeInTheDocument();
	});

	it('deve ordenar investimentos por data (mais recente primeiro)', () => {
		const contextWithMultipleInvestments = {
			...mockContextValue,
			expenses: [
				{
					id: '1',
					description: 'Investimento Antigo',
					amount: '100',
					date: '2025-01-01',
					category: 'investimentos' as const,
				},
				{
					id: '2',
					description: 'Investimento Recente',
					amount: '200',
					date: '2025-12-01',
					category: 'investimentos' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithMultipleInvestments}>
				<Investimentos />
			</FinanceContext.Provider>,
		);

		const descriptions = screen.getAllByRole('heading', { level: 5 });
		expect(descriptions[0]).toHaveTextContent('Investimento Recente');
		expect(descriptions[1]).toHaveTextContent('Investimento Antigo');
	});

	it('deve filtrar apenas despesas da categoria investimentos', () => {
		const contextWithMixedExpenses = {
			...mockContextValue,
			expenses: [
				{
					id: '1',
					description: 'Tesouro Direto',
					amount: '1000',
					date: '2025-12-01',
					category: 'investimentos' as const,
				},
				{
					id: '2',
					description: 'Mercado',
					amount: '200',
					date: '2025-12-01',
					category: 'necessarios' as const,
				},
			],
		};

		render(
			<FinanceContext.Provider value={contextWithMixedExpenses}>
				<Investimentos />
			</FinanceContext.Provider>,
		);

		expect(screen.getByText('Tesouro Direto')).toBeInTheDocument();
		expect(screen.queryByText('Mercado')).not.toBeInTheDocument();
	});
});
