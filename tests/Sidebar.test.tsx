import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../src/components/ui/sidebar';
import { NAVIGATION_LINKS } from '../src/utils/navigation';

describe('componente Sidebar', () => {
	it('deve renderizar o título corretamente', () => {
		render(
			<BrowserRouter>
				<Sidebar />
			</BrowserRouter>,
		);
		expect(screen.getByText('Gerenciador de Gastos')).toBeInTheDocument();
	});

	it('deve renderizar todos os links de navegação', () => {
		render(
			<BrowserRouter>
				<Sidebar />
			</BrowserRouter>,
		);
		NAVIGATION_LINKS.forEach((link) => {
			expect(screen.getByText(link.label)).toBeInTheDocument();
		});
	});
});
