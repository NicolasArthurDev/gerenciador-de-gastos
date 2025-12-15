export type ExpenseCategory =
	| 'necessarios'
	| 'variaveis'
	| 'investimentos'
	| 'diversao';

type HistoryItem = {
	id: string;
	description: string;
	amount: string;
	date: string;
};

type EntryHistoryProps = {
	type: 'entry';
	items: HistoryItem[];
	onDelete: (id: string) => void;
	onEdit?: (item: HistoryItem) => void;
};

type ExpenseHistoryProps = {
	type: 'expense';
	items: Array<HistoryItem & { category: ExpenseCategory }>;
	onDelete: (id: string) => void;
	onEdit?: (item: HistoryItem & { category: ExpenseCategory }) => void;
};

type HistoryProps = EntryHistoryProps | ExpenseHistoryProps;

export default function History({
	type,
	items,
	onDelete,
	onEdit,
}: HistoryProps) {
	const isEntry = type === 'entry';
	const title = isEntry ? 'Histórico de Entradas' : 'Histórico de Despesas';
	const emptyMessage = isEntry
		? 'Nenhuma entrada registrada ainda.'
		: 'Nenhuma despesa registrada ainda.';
	const colorClass = isEntry ? 'text-green-400' : 'text-red-400';
	const prefix = isEntry ? '+' : '-';
	const categoryLabels: Record<string, string> = {
		necessarios: 'Gastos Necessários',
		variaveis: 'Gastos Variáveis',
		investimentos: 'Investimentos',
		diversao: 'Diversão',
	};

	return (
		<div className="bg-stone-800 rounded-xl border border-stone-700 overflow-hidden">
			<div className="p-4 border-b border-stone-700">
				<h4 className="text-white font-semibold">{title}</h4>
			</div>
			<div className="divide-y divide-stone-700">
				{items.length === 0 ? (
					<div className="p-8 text-center text-stone-400">
						{emptyMessage}
					</div>
				) : (
					items.map((item) => (
						<div
							key={item.id}
							className="p-4 hover:bg-stone-750 transition-colors flex justify-between items-center"
						>
							<div className="flex-1">
								<p className="text-white font-medium">
									{item.description}
								</p>
								<div className="flex flex-col">
									<p className="text-stone-400 text-sm">
										{new Date(item.date).toLocaleDateString(
											'pt-BR',
										)}
									</p>
									{!isEntry && (
										<span className="text-xs text-stone-400">
											{
												categoryLabels[
													(
														item as HistoryItem & {
															category: ExpenseCategory;
														}
													).category
												]
											}
										</span>
									)}
								</div>
							</div>
							<div className="flex items-center gap-4">
								<span
									className={`${colorClass} font-semibold text-lg`}
								>
									{prefix} R${' '}
									{parseFloat(item.amount).toFixed(2)}
								</span>
								<div className="flex gap-2">
									{onEdit && (
										<button
											onClick={() =>
												onEdit(
													item as HistoryItem & {
														category: ExpenseCategory;
													},
												)
											}
											className="text-blue-400 hover:text-blue-300 px-3 py-1 rounded transition-colors"
										>
											Editar
										</button>
									)}
									<button
										onClick={() => onDelete(item.id)}
										className="text-red-400 hover:text-red-300 px-3 py-1 rounded transition-colors"
									>
										Remover
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
