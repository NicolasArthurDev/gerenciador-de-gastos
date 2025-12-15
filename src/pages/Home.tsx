import TotalBalanceCard from '../components/ui/dashboard/TotalBalanceCard';
import RevenueCard from '../components/ui/dashboard/RevenueCard';
import ExpensesCard from '../components/ui/dashboard/ExpensesCard';
import ExpenseDistributionCard from '../components/ui/dashboard/ExpenseDistributionCard';
import ExpenseAlertsCard from '../components/ui/dashboard/ExpenseAlertsCard';
import ActiveCardsCard from '../components/ui/dashboard/ActiveCardsCard';
import RecentActivityCard from '../components/ui/dashboard/RecentActivityCard';
import SavingsGoalCard from '../components/ui/dashboard/SavingsGoalCard';
import InvestmentsCard from '../components/ui/dashboard/InvestmentsCard';
import UpcomingBillsCard from '../components/ui/dashboard/UpcomingBillsCard';
import ExchangeRatesCard from '../components/ui/dashboard/ExchangeRatesCard';

export default function Home() {
	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h2 className="text-2xl text-white font-semibold mb-6">
				Dashboard Financeiro
			</h2>

			<div className="grid grid-cols-12 gap-3 auto-rows-fr">
				<TotalBalanceCard />
				<RevenueCard />
				<ExpensesCard />
				<ExchangeRatesCard />
				<ExpenseDistributionCard />
				<ExpenseAlertsCard />
				<RecentActivityCard />
				<ActiveCardsCard />
				<SavingsGoalCard />
				<InvestmentsCard />
				<UpcomingBillsCard />
			</div>
		</main>
	);
}
