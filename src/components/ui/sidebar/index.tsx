
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../../utils/navigation';
import { useState } from 'react';

export default function Sidebar() {
	const location = useLocation();
	const [open, setOpen] = useState(false);

	return (
		<><aside
      className={`bg-stone-800 text-white p-4 flex flex-col justify-between min-h-screen overflow-y-auto col-span-2 px-8 lg:block ${open ? 'block' : 'hidden'} lg:min-w-[220px] fixed top-0 left-0 w-3/4 max-w-xs z-50 lg:z-auto lg:w-auto lg:max-w-none lg:static`}
    >
      <div>
        <h1 className="text-3xl font-semibold mt-8 mb-6">
          Gerenciador de Gastos
        </h1>
        <hr className="opacity-20" />
        <nav className="w-full">
          <ul className="flex flex-col gap-3 mt-6 w-full lg:col-span-1">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.id} className="w-full">
                  <Link
                    className={`w-full items-center block py-4 px-6 text-left font-medium transition-all duration-300  rounded ${isActive
                        ? 'text-black bg-stone-200'
                        : 'text-stone-300 hover:text-cyan-800 hover:bg-stone-200'}`}
                    to={link.path}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside><button
      className="lg:hidden fixed top-4 left-4 z-[100] bg-stone-800 text-white p-2 rounded focus:outline-none"
      onClick={() => setOpen((prev) => !prev)}
      aria-label="Menu"
    >
        <span className="block w-6 h-1 bg-white mb-1 rounded"></span>
        <span className="block w-6 h-1 bg-white mb-1 rounded"></span>
        <span className="block w-6 h-1 bg-white rounded"></span>
      </button></>
	);
}
