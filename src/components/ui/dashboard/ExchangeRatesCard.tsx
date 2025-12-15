import { useEffect, useState } from 'react';
import { DollarSign, Coins } from 'lucide-react';
import Card from './Card';
import CardHeader from './CardHeader';
import ExchangeRateItem from './ExchangeRateItem';

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

				const usdResponse = await fetch(
					'https://api.exchangerate-api.com/v4/latest/USD',
				);
				const usdData = await usdResponse.json();
				const usdToBrl = usdData.rates?.BRL || null;

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
		const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Card colSpan="col-span-12 md:col-span-6 lg:col-span-4" className="p-6">
			<CardHeader title="Cotações" icon={Coins} iconColor="text-yellow-400" />

			{rates.loading ? (
				<div className="text-stone-400 text-sm">Carregando...</div>
			) : rates.error ? (
				<div className="text-red-400 text-sm">{rates.error}</div>
			) : (
				<div className="space-y-4">
					<ExchangeRateItem
						icon={DollarSign}
						iconColor="text-green-400"
						label="USD/BRL"
						value={rates.usdToBrl}
						formatter={(value) => `R$ ${value.toFixed(2)}`}
					/>
					<ExchangeRateItem
						icon={Coins}
						iconColor="text-orange-400"
						label="BTC/USD"
						value={rates.btcToUsd}
						formatter={(value) =>
							`$${value.toLocaleString('pt-BR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}`
						}
					/>
					<ExchangeRateItem
						icon={Coins}
						iconColor="text-orange-400"
						label="BTC/BRL"
						value={rates.btcToBrl}
						formatter={(value) =>
							`R$ ${value.toLocaleString('pt-BR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}`
						}
					/>
				</div>
			)}
		</Card>
	);
}


