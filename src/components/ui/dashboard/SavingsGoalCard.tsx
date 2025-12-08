


import { Calendar } from 'lucide-react';


export default function SavingsGoalCard() {
	return (
		<div className="col-span-6 md:col-span-3 lg:col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow select-none">
			<div className="flex flex-col justify-between h-full">
				<div>
					<Calendar className="text-white opacity-80 mb-3" size={24} />
					<p className="text-amber-100 text-sm mb-2 truncate">Meta de Economia</p>
					<p className="text-3xl font-bold text-white mb-4 truncate">R$ 2.000</p>
				</div>
				<div>
					<div className="w-full bg-amber-800 rounded-full h-3 mb-2">
						<div className="bg-white h-3 rounded-full w-[65%]"></div>
					</div>
					<p className="text-amber-100 text-xs">65% alcançado</p>
				</div>
			</div>
		</div>
	);
}
