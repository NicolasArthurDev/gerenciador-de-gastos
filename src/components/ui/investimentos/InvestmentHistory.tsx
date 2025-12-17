import { formatCurrency } from '../../../utils/financeCalculations';
import type { Expense } from '../../../contexts/FinanceContext';

interface InvestmentHistoryProps {
	investments: Expense[];
	onEdit?: (investment: Expense) => void;
	onDelete?: (id: string) => void;
}

export function InvestmentHistory({
	investments,
	onEdit,
	onDelete,
}: InvestmentHistoryProps) {
	return (
		<div className="bg-stone-800 rounded-xl border border-stone-700 overflow-hidden">
			<div className="p-6 border-b border-stone-700">
				<h4 className="text-lg font-semibold text-white">
					Histórico de Investimentos
				</h4>
			</div>

			<div className="divide-y divide-stone-700">
				{investments.length === 0 ? (
					<div className="p-8 text-center text-stone-400">
						Nenhum investimento registrado ainda.
						<p className="text-sm mt-2">
							Adicione um investimento usando o formulário acima.
						</p>
					</div>
				) : (
					investments.map((investment) => (
						<div
							key={investment.id}
							className="p-4 hover:bg-stone-700/50 transition-colors"
						>
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<h5 className="text-white font-medium mb-1">
										{investment.description}
									</h5>
									<p className="text-stone-400 text-sm">
										{new Date(
											investment.date,
										).toLocaleDateString('pt-BR', {
											day: '2-digit',
											month: 'long',
											year: 'numeric',
										})}
									</p>
								</div>
								<div className="flex items-center gap-4">
									<p className="text-cyan-400 font-bold text-lg">
										{formatCurrency(
											parseFloat(investment.amount),
										)}
									</p>
									<div className="flex gap-2">
										{onEdit && (
											<button
												onClick={() =>
													onEdit(investment)
												}
												className="text-blue-400 hover:text-blue-300 px-3 py-1 rounded transition-colors"
											>
												Editar
											</button>
										)}
										{onDelete && (
											<button
												onClick={() =>
													onDelete(investment.id)
												}
												className="text-red-400 hover:text-red-300 px-3 py-1 rounded transition-colors"
											>
												Remover
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
