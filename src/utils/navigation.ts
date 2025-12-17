import type { NavigationLink } from '../types/navigation';

export const NAVIGATION_LINKS: readonly NavigationLink[] = [
	{
		id: 0,
		label: 'Dashboard',
		path: '/',
	},
	{
		id: 1,
		label: 'Entradas',
		path: '/entradas',
	},
	{
		id: 2,
		label: 'Despesas',
		path: '/despesas',
	},
	{
		id: 3,
		label: 'Contas a pagar',
		path: '/contas-a-pagar',
	},
	{
		id: 4,
		label: 'Metas',
		path: '/metas',
	},
	{
		id: 5,
		label: 'Investimentos',
		path: '/investimentos',
	},
	{
		id: 6,
		label: 'Redistribuição',
		path: '/redistribuicao',
	},
] as const;
