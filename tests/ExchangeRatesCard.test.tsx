import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ExchangeRatesCard from '../src/components/ui/dashboard/ExchangeRatesCard';

// Mock das APIs
global.fetch = vi.fn();

describe('ExchangeRatesCard', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('deve exibir "Carregando..." quando está buscando as cotações', () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				json: () => new Promise(() => {}), 
			}),
		) as any;

		render(<ExchangeRatesCard />);
		expect(screen.getByText('Carregando...')).toBeInTheDocument();
	});

	it('deve exibir as cotações quando a API retorna com sucesso', async () => {
		global.fetch = vi.fn((url: string) => {
			if (url.includes('exchangerate-api')) {
				return Promise.resolve({
					json: () =>
						Promise.resolve({
							rates: { BRL: 5.5 },
						}),
				});
			}
			if (url.includes('coingecko')) {
				return Promise.resolve({
					json: () =>
						Promise.resolve({
							bitcoin: { usd: 50000, brl: 275000 },
						}),
				});
			}
			return Promise.reject(new Error('URL não reconhecida'));
		}) as any;

		render(<ExchangeRatesCard />);

		// Aguarda as cotações aparecerem
		await waitFor(() => {
			expect(screen.getByText('USD/BRL')).toBeInTheDocument();
			expect(screen.getByText('BTC/USD')).toBeInTheDocument();
			expect(screen.getByText('BTC/BRL')).toBeInTheDocument();
		});
	});
});

