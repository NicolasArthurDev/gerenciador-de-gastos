import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 

export default function Sidebar() {

  const [activeTab, setActiveTab] = useState(0);

  const links = [
    {
      id: 0,
      label: "Dashboard",
      path: "/"
    },
    {
      id: 1,
      label: "Entradas",
      path: "/entradas"
    },
    {
      id: 2,
      label: "Despesas",
      path: "/despesas"
    },
    {
      id: 3,
      label: "Metas",
      path: "/metas"
    }
  ]

	return (
		<aside
			className={`bg-stone-800 text-white p-4 flex flex-col justify-between min-h-screen overflow-y-auto col-span-2 px-8`}
		>
			<div className=''>
        <h1 className="text-3xl font-semibold mt-8 mb-6">
          Gerenciador de Gastos
        </h1>
        <hr className="opacity-20" />
        <nav className="w-full">
          <ul className="flex flex-col gap-3 mt-6 w-full md:col-span-1">
            {links.map( (link) => (
              <li key={link.id} className="w-full">
                <Link 
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full items-center block py-4 px-6 text-left font-medium transition-all duration-300 border-l-4 rounded ${
                    activeTab === link.id ? 'text-blue-500 bg-stone-200' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                  }`} 
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
			<div>
        <hr className="opacity-20" />
        <div className="flex flex-row mt-6 mb-6 gap-4 items-center">
          <CircleUserRound size={40} />
          <p className="text-lg ">Mello</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>Minha conta</p>
          <p>Sair</p>
        </div>
        <div className="mt-6 text-xs text-stone-300">v1.0.0</div>
      </div>
		</aside>
	);
}
