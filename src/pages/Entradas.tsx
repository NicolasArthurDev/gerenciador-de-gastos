import { useFinance } from '../contexts/useFinance';
import { EntryForm } from '../components/ui/form';
import History from '../components/ui/history';

export default function Entradas() {
	const { entries, addEntry, deleteEntry } = useFinance();

	const handleSubmit = (data: {
		description: string;
		amount: string;
		date: string;
	}) => {
		addEntry({
			id: Date.now().toString(),
			...data,
		});
	};

	const handleDelete = (id: string) => {
		deleteEntry(id);
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Entradas</h3>

			<EntryForm onSubmit={handleSubmit} />

			<History type="entry" items={entries} onDelete={handleDelete} />
		</main>
	);
}
