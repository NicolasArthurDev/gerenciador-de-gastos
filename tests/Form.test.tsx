import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EntryForm, ExpenseForm } from '../src/components/ui/form';

describe('componente EntryForm', () => {
	it('deve chamar onSubmit ao enviar o formulário', () => {
		const onSubmitMock = vi.fn();
		const { container } = render(<EntryForm onSubmit={onSubmitMock} />);

		const form = container.querySelector('form');
		if (form) {
			fireEvent.submit(form);
		}

		expect(onSubmitMock).toHaveBeenCalled();
	});
});

describe('componente ExpenseForm', () => {
	it('deve chamar onSubmit ao enviar o formulário', () => {
		const onSubmitMock = vi.fn();
		const { container } = render(<ExpenseForm onSubmit={onSubmitMock} />);

		const form = container.querySelector('form');
		if (form) {
			fireEvent.submit(form);
		}

		expect(onSubmitMock).toHaveBeenCalled();
	});
});
