import { useEffect, useState } from 'react';
import { EntryForm } from '../components/ui/form';
import History from '../components/ui/history';

interface Entry {
	id: string;
	description: string;
	amount: string;
	date: string;
}

export default function Entradas() {
	const [entries, setEntries] = useState<Entry[]>(() => {
		const saved = localStorage.getItem('entries');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('entries', JSON.stringify(entries));
	}, [entries]);

	const handleSubmit = (data: { description: string; amount: string; date: string }) => {
		const newEntry: Entry = {
			id: Date.now().toString(),
			...data,
		};
		setEntries((prev) => [...prev, newEntry]);
	};

	const handleDelete = (id: string) => {
		setEntries((prev) => prev.filter((entry) => entry.id !== id));
	};

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Entradas</h3>

			<EntryForm onSubmit={handleSubmit} />

			<History type="entry" items={entries} onDelete={handleDelete} />
		</main>
	);
}
