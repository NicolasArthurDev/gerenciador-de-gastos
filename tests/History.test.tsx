import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import History from '../src/components/ui/history';
import type { ExpenseCategory } from '../src/contexts/FinanceContext';

describe('componente History', () => {
	const mockOnDelete = vi.fn();

	it('deve renderizar o título de entradas corretamente', () => {
		render(<History type="entry" items={[]} onDelete={mockOnDelete} />);
		expect(screen.getByText('Histórico de Entradas')).toBeInTheDocument();
	});

	it('deve renderizar o título de despesas corretamente', () => {
		render(<History type="expense" items={[]} onDelete={mockOnDelete} />);
		expect(screen.getByText('Histórico de Despesas')).toBeInTheDocument();
	});

	it('deve exibir mensagem quando não há entradas', () => {
		render(<History type="entry" items={[]} onDelete={mockOnDelete} />);
		expect(
			screen.getByText('Nenhuma entrada registrada ainda.'),
		).toBeInTheDocument();
	});

	it('deve exibir mensagem quando não há despesas', () => {
		render(<History type="expense" items={[]} onDelete={mockOnDelete} />);
		expect(
			screen.getByText('Nenhuma despesa registrada ainda.'),
		).toBeInTheDocument();
	});

	it('deve renderizar os itens corretamente', () => {
		const items = [
			{
				id: '1',
				description: 'Salário',
				amount: '5000',
				date: '2025-12-01',
			},
		];
		render(<History type="entry" items={items} onDelete={mockOnDelete} />);
		expect(screen.getByText('Salário')).toBeInTheDocument();
		expect(screen.getByText('+ R$ 5000.00')).toBeInTheDocument();
	});

	it('deve renderizar o botão de remover', () => {
		const items = [
			{
				id: '1',
				description: 'Conta',
				amount: '150',
				date: '2025-12-01',
				category: 'necessarios' as ExpenseCategory,
			},
		];
		render(
			<History type="expense" items={items} onDelete={mockOnDelete} />,
		);
		expect(screen.getByText('Remover')).toBeInTheDocument();
	});

	it('deve chamar onDelete ao clicar no botão remover', () => {
		const onDeleteMock = vi.fn();
		const items = [
			{
				id: '1',
				description: 'Conta',
				amount: '150',
				date: '2025-12-01',
				category: 'necessarios' as ExpenseCategory,
			},
		];
		render(
			<History type="expense" items={items} onDelete={onDeleteMock} />,
		);
		const removeButton = screen.getByText('Remover');
		fireEvent.click(removeButton);
		expect(onDeleteMock).toHaveBeenCalledWith('1');
	});

	it('deve remover o item da lista ao clicar em remover', () => {
		const items = [
			{
				id: '1',
				description: 'Conta',
				amount: '150',
				date: '2025-12-01',
				category: 'necessarios' as ExpenseCategory,
			},
			{
				id: '2',
				description: 'Aluguel',
				amount: '1200',
				date: '2025-12-01',
				category: 'necessarios' as ExpenseCategory,
			},
		];

		let currentItems = [...items];
		const onDeleteMock = vi.fn((id: string) => {
			currentItems = currentItems.filter((item) => item.id !== id);
		});

		const { rerender } = render(
			<History
				type="expense"
				items={currentItems}
				onDelete={onDeleteMock}
			/>,
		);

		expect(screen.getByText('Conta')).toBeInTheDocument();
		expect(screen.getByText('Aluguel')).toBeInTheDocument();

		const removeButtons = screen.getAllByText('Remover');
		fireEvent.click(removeButtons[0]);

		rerender(
			<History
				type="expense"
				items={currentItems}
				onDelete={onDeleteMock}
			/>,
		);

		expect(screen.queryByText('Conta')).not.toBeInTheDocument();
		expect(screen.getByText('Aluguel')).toBeInTheDocument();
	});
});
