import './App.css';
import Sidebar from './components/ui/sidebar';
import Home from './pages/Home';

function App() {
	return (
		<div className='grid grid-cols-12 w-full h-screen'>
			<Sidebar/>
			<Home/>
		</div>
	);
}

export default App;
