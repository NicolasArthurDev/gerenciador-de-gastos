import { CircleUserRound } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className={`bg-stone-800 text-white p-4 flex flex-col min-h-screen overflow-y-auto col-span-2 px-8`}>
            <h2 className="text-3xl font-semibold mt-8 mb-6">Gerenciador de Gastos</h2>
            <hr className="opacity-20"/>


            <nav className="flex-1 mt-8 mb-8">
                <ul className="space-y-4 text-xl">
                    <li>
                        Dashboard   
                    </li>
                    <li>
                        Entradas
                    </li>
                    <li>
                        Despesas
                    </li>
                    <li>
                        Configurações
                    </li>
                </ul>
            </nav>
            <hr className="opacity-20"/>

            <div className="flex flex-row mt-6 mb-6 gap-4 items-center">
                <CircleUserRound size={40}/>
                <p className="text-lg ">Mello</p>
            </div>

           <div className="flex flex-row justify-between">
                <p>Minha conta</p>
                <p>Sair</p>
            </div>


            <div className="mt-6 text-xs text-stone-300">v1.0.0</div>
        </aside>
    );
}