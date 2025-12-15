import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-white mb-4">404</h1>
				<h2 className="text-2xl font-semibold text-stone-300 mb-4">
					Página não encontrada
				</h2>
				<p className="text-stone-400 mb-8">
					A página que você está procurando não existe.
				</p>
				<Link
					to="/"
					className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
				>
					<Home size={20} />
					Voltar para o Dashboard
				</Link>
			</div>
		</main>
	);
}
