import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/ui/sidebar';
import Home from './pages/Home';
import Entradas from './pages/Entradas';
import Despesas from './pages/Despesas';
import Metas from './pages/Metas';
import Redistribuicao from './pages/Redistribuicao';
import ContasaPagar from './pages/ContasaPagar';
import Investimentos from './pages/Investimentos';
import NotFound from './pages/NotFound';
import { FinanceProvider } from './contexts/FinanceContext';

function App() {
	return (
		<FinanceProvider>
			<div className="grid grid-cols-12 w-full h-screen">
				<BrowserRouter>
					<Sidebar />
					<Routes>
						<Route path="/" Component={Home}></Route>
						<Route path="/entradas" Component={Entradas}></Route>
						<Route path="/despesas" Component={Despesas}></Route>
						<Route path="/metas" Component={Metas}></Route>
						<Route
							path="/redistribuicao"
							Component={Redistribuicao}
						></Route>
						<Route
							path="/contas-a-pagar"
							Component={ContasaPagar}
						></Route>
						<Route
							path="/investimentos"
							Component={Investimentos}
						></Route>
						<Route path="*" Component={NotFound}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		</FinanceProvider>
	);
}

export default App;
