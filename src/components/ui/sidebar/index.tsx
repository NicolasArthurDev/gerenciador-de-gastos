export default function Sidebar() {
    return (
        <aside
            className={`bg-gray-800 text-white p-4 flex flex-col min-h-screen overflow-y-auto col-span-2`}
            aria-label="Sidebar"
        >
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Meu App</h2>
            </div>

            <nav className="flex-1">
                <ul className="space-y-2 text-sm">
                    <li>
                        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Relatórios</a>
                    </li>
                    <li>
                        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Configurações</a>
                    </li>
                </ul>
            </nav>

            <div className="mt-6 text-xs text-gray-300">v1.0.0</div>
        </aside>
    );
}