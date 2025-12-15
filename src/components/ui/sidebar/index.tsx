import { CircleUserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
	const location = useLocation();

	const links = [
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
	];

	return (
		<aside
			className={`bg-stone-800 text-white p-4 flex flex-col justify-between min-h-screen overflow-y-auto col-span-2 px-8`}
		>
			<div className="">
				<h1 className="text-3xl font-semibold mt-8 mb-6">
					Gerenciador de Gastos
				</h1>
				<hr className="opacity-20" />
				<nav className="w-full">
					<ul className="flex flex-col gap-3 mt-6 w-full md:col-span-1">
						{links.map((link) => {
							const isActive = location.pathname === link.path;
							return (
								<li key={link.id} className="w-full">
									<Link
										className={`w-full items-center block py-4 px-6 text-left font-medium transition-all duration-300  rounded ${
											isActive
												? 'text-black bg-stone-200'
												: 'text-stone-300 hover:text-cyan-800 hover:bg-stone-200'
										}`}
										to={link.path}
									>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
			<div>
				<hr className="opacity-20" />
				<div className="flex flex-row mt-6 mb-6 gap-4 items-center">
					<CircleUserRound size={40} />
					<p className="text-lg ">Usuario</p>
				</div>
				<div className="flex flex-row justify-between">
					<p className="text-stone-300 hover:text-white cursor-pointer">Minha conta</p>
					<button className="text-red-500 hover:text-red-700 cursor-pointer">Sair</button>
				</div>
				<div className="mt-6 text-xs text-stone-300">v1.0.0</div>
			</div>
		</aside>
	);
}
