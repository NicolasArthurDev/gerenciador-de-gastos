import { useEffect, useState } from 'react';
import { DollarSign, Coins } from 'lucide-react';

interface ExchangeRates {
	usdToBrl: number | null;
	btcToUsd: number | null;
	btcToBrl: number | null;
	loading: boolean;
	error: string | null;
}

export default function ExchangeRatesCard() {
	const [rates, setRates] = useState<ExchangeRates>({
		usdToBrl: null,
		btcToUsd: null,
		btcToBrl: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		const fetchExchangeRates = async () => {
			try {
				setRates((prev) => ({ ...prev, loading: true, error: null }));

				// dolar para real
				const usdResponse = await fetch(
					'https://api.exchangerate-api.com/v4/latest/USD',
				);
				const usdData = await usdResponse.json();
				const usdToBrl = usdData.rates?.BRL || null;

				// bitcoin
				const btcResponse = await fetch(
					'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl',
				);
				const btcData = await btcResponse.json();
				const btcToUsd = btcData.bitcoin?.usd || null;
				const btcToBrl = btcData.bitcoin?.brl || null;

				setRates({
					usdToBrl,
					btcToUsd,
					btcToBrl,
					loading: false,
					error: null,
				});
			} catch (error) {
				setRates((prev) => ({
					...prev,
					loading: false,
					error: 'Erro ao buscar cotações',
				}));
				console.error('Erro ao buscar cotações:', error);
			}
		};

		fetchExchangeRates();
		// aqui a api atualiza a cada 5 minutos
		const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-4 bg-stone-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-stone-700">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-white">
					Cotações
				</h3>
				<Coins className="text-yellow-400" size={24} />
			</div>

			{rates.loading ? (
				<div className="text-stone-400 text-sm">Carregando...</div>
			) : rates.error ? (
				<div className="text-red-400 text-sm">{rates.error}</div>
			) : (
				<div className="space-y-4">
					{/* dolar */}
					<div className="flex items-center justify-between p-3 bg-stone-700/50 rounded-lg">
						<div className="flex items-center gap-2">
							<DollarSign className="text-green-400" size={20} />
							<span className="text-stone-300 text-sm">USD/BRL</span>
						</div>
						{rates.usdToBrl ? (
							<span className="text-white font-semibold">
								R$ {rates.usdToBrl.toFixed(2)}
							</span>
						) : (
							<span className="text-stone-500 text-sm">N/A</span>
						)}
					</div>

					{/* bitcoin em dolar */}
					<div className="flex items-center justify-between p-3 bg-stone-700/50 rounded-lg">
						<div className="flex items-center gap-2">
							<Coins className="text-orange-400" size={20} />
							<span className="text-stone-300 text-sm">BTC/USD</span>
						</div>
						{rates.btcToUsd ? (
							<span className="text-white font-semibold">
								${rates.btcToUsd.toLocaleString('pt-BR', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						) : (
							<span className="text-stone-500 text-sm">N/A</span>
						)}
					</div>

					{/* bitcoin em real */}
					<div className="flex items-center justify-between p-3 bg-stone-700/50 rounded-lg">
						<div className="flex items-center gap-2">
							<Coins className="text-orange-400" size={20} />
							<span className="text-stone-300 text-sm">BTC/BRL</span>
						</div>
						{rates.btcToBrl ? (
							<span className="text-white font-semibold">
								R${' '}
								{rates.btcToBrl.toLocaleString('pt-BR', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						) : (
							<span className="text-stone-500 text-sm">N/A</span>
						)}
					</div>
				</div>
			)}
		</div>
	);
}


