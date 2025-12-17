import { useState, useMemo, useEffect } from 'react';
import { useFinance } from '../contexts/useFinance';
import DistributionItem from '../components/ui/dashboard/DistributionItem';
import { calculateTotal } from '../utils/financeCalculations';

const categoryConfig = {
	necessarios: { label: 'Gastos Necessários', color: 'bg-blue-500' },
	variaveis: { label: 'Gastos Variáveis', color: 'bg-purple-500' },
	investimentos: { label: 'Investimentos', color: 'bg-orange-500' },
	diversao: { label: 'Diversão', color: 'bg-green-500' },
} as const;

export default function Redistribuicao() {
	const { distribution, updateDistribution, entries } = useFinance();
	const [draft, setDraft] = useState(distribution);

	const totalEntries = useMemo(() => calculateTotal(entries), [entries]);

	const total = useMemo(
		() =>
			draft.necessarios +
			draft.variaveis +
			draft.investimentos +
			draft.diversao,
		[draft],
	);
	const hasError = total !== 100;

	const maxAmounts = useMemo(() => {
		return {
			necessarios: (totalEntries * (draft.necessarios || 0)) / 100,
			variaveis: (totalEntries * (draft.variaveis || 0)) / 100,
			investimentos: (totalEntries * (draft.investimentos || 0)) / 100,
			diversao: (totalEntries * (draft.diversao || 0)) / 100,
		};
	}, [totalEntries, draft]);

	const handleChange = (key: keyof typeof draft, value: number) => {
		setDraft((prev) => ({
			...prev,
			[key]: isNaN(value) ? 0 : value,
		}));
	};

	const handleSave = () => {
		if (hasError) return;
		updateDistribution(draft);
	};

	const handleReset = () => {
		setDraft({
			necessarios: 50,
			variaveis: 10,
			investimentos: 30,
			diversao: 10,
		});
	};

	useEffect(() => {
		setDraft(distribution);
	}, [distribution]);

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">
				Redistribuição de Gastos
			</h3>

			<div className="bg-stone-800 rounded-xl border border-stone-700 p-6 mb-6">
				<p className="text-stone-300 text-sm mb-4">
					Ajuste as porcentagens de distribuição dos seus gastos. A
					soma deve ser exatamente 100%.
				</p>

				<div className="grid grid-cols-2 gap-6">
					{Object.entries(categoryConfig).map(([key, cfg]) => (
						<div
							key={key}
							className="space-y-3 bg-stone-700/30 p-4 rounded-lg"
						>
							<div className="flex items-center justify-between">
								<span className="text-stone-200 text-base font-medium">
									{cfg.label}
								</span>
								<span className="text-white font-semibold text-lg">
									{draft[key as keyof typeof draft]}%
								</span>
							</div>
							<div className="text-xs text-stone-400">
								Máximo: R${' '}
								{maxAmounts[
									key as keyof typeof maxAmounts
								].toFixed(2)}
							</div>
							<input
								type="range"
								min={0}
								max={100}
								value={draft[key as keyof typeof draft]}
								onChange={(e) =>
									handleChange(
										key as keyof typeof draft,
										Number(e.target.value),
									)
								}
								className="w-full accent-blue-500"
							/>
							<input
								type="number"
								min={0}
								max={100}
								value={draft[key as keyof typeof draft]}
								onChange={(e) =>
									handleChange(
										key as keyof typeof draft,
										Number(e.target.value),
									)
								}
								className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg border border-stone-600 focus:outline-none focus:border-blue-500"
							/>
							<div className="w-full bg-stone-700 rounded-full h-2">
								<div
									className={`${cfg.color} h-2 rounded-full transition-all`}
									style={{
										width: `${draft[key as keyof typeof draft]}%`,
									}}
								></div>
							</div>
						</div>
					))}
				</div>

				<div className="flex items-center justify-between text-base pt-6 mt-6 border-t border-stone-700">
					<span className="text-stone-300 font-medium">Total</span>
					<span
						className={`font-bold text-lg ${
							hasError ? 'text-red-400' : 'text-green-400'
						}`}
					>
						{total}%
					</span>
				</div>

				{hasError && (
					<p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30 mt-4">
						A soma deve ser exatamente 100%. Atualmente está em{' '}
						{total}%.
					</p>
				)}

				<div className="flex gap-3 pt-4">
					<button
						onClick={handleSave}
						disabled={hasError}
						className={`flex-1 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
							hasError
								? 'bg-stone-700 text-stone-400 cursor-not-allowed'
								: 'bg-blue-600 hover:bg-blue-700'
						}`}
					>
						Salvar Distribuição
					</button>
					<button
						onClick={handleReset}
						className="px-6 py-3 rounded-lg text-white bg-stone-700 hover:bg-stone-600 transition-colors font-medium"
					>
						Restaurar Padrão
					</button>
				</div>
			</div>

			<div className="bg-stone-800 rounded-xl border border-stone-700 p-6">
				<h4 className="text-white font-semibold mb-4 text-lg">
					Visualização Atual
				</h4>
				<div className="space-y-4">
					{Object.entries(categoryConfig).map(([key, cfg]) => {
						const maxAmount =
							(totalEntries *
								distribution[
									key as keyof typeof distribution
								]) /
							100;
						return (
							<DistributionItem
								key={key}
								label={cfg.label}
								percentage={
									distribution[
										key as keyof typeof distribution
									]
								}
								color={cfg.color}
								maxAmount={maxAmount}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
}
