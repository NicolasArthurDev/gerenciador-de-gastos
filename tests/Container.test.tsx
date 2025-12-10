import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from '../src/components/Container';

describe('componente container', () => {
	it('deve renderizar o conteúdo corretamente', () => {
		render(<Container>Hello World</Container>);
		expect(screen.getByText('Hello World')).toBeInTheDocument();
	});
});
