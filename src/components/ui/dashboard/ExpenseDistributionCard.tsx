import { PieChart } from 'lucide-react';

export default function ExpenseDistributionCard() {
	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-1 bg-stone-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-white font-semibold truncate">
					Distribuição de Gastos
				</h4>
				<PieChart className="text-blue-400 flex-shrink-0" size={20} />
			</div>
			<div className="space-y-4 overflow-hidden">
				<div>
					<div className="flex justify-between text-sm mb-1">
						<span className="text-stone-300 truncate">
							Alimentação
						</span>
						<span className="text-white font-medium ml-2">35%</span>
					</div>
					<div className="w-full bg-stone-700 rounded-full h-2">
						<div className="bg-blue-500 h-2 rounded-full w-[35%]"></div>
					</div>
				</div>
				<div>
					<div className="flex justify-between text-sm mb-1">
						<span className="text-stone-300 truncate">
							Transporte
						</span>
						<span className="text-white font-medium ml-2">25%</span>
					</div>
					<div className="w-full bg-stone-700 rounded-full h-2">
						<div className="bg-purple-500 h-2 rounded-full w-[25%]"></div>
					</div>
				</div>
				<div>
					<div className="flex justify-between text-sm mb-1">
						<span className="text-stone-300 truncate">Moradia</span>
						<span className="text-white font-medium ml-2">30%</span>
					</div>
					<div className="w-full bg-stone-700 rounded-full h-2">
						<div className="bg-orange-500 h-2 rounded-full w-[30%]"></div>
					</div>
				</div>
				<div>
					<div className="flex justify-between text-sm mb-1">
						<span className="text-stone-300 truncate">Outros</span>
						<span className="text-white font-medium ml-2">10%</span>
					</div>
					<div className="w-full bg-stone-700 rounded-full h-2">
						<div className="bg-green-500 h-2 rounded-full w-[10%]"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
