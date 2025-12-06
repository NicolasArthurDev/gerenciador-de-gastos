import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/ui/sidebar';
import Home from './pages/Home';

function App() {
	return (
		<div className='grid grid-cols-12 w-full h-screen'>

      <BrowserRouter>
      <Sidebar/>
        <Routes>
          <Route path='/' Component={Home}></Route>
        </Routes>
      </BrowserRouter>

			
		</div>
	);
}

export default App;
