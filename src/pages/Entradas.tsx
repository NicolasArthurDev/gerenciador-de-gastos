import { useState } from 'react';
import { useFinance } from '../contexts/useFinance';
import type { Entry } from '../contexts/FinanceContext';
import { EntryForm } from '../components/ui/form';
import History from '../components/ui/history';

export default function Entradas() {
	const { entries, addEntry, updateEntry, deleteEntry } = useFinance();
	const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

	const handleSubmit = (data: {
		description: string;
		amount: string;
		date: string;
	}) => {
		if (editingEntry) {
			updateEntry(editingEntry.id, {
				...editingEntry,
				...data,
			});
			setEditingEntry(null);
		} else {
			addEntry({
				id: Date.now().toString(),
				...data,
			});
		}
	};

	const handleEdit = (item: Entry) => {
		setEditingEntry(item);
	};

	const handleCancel = () => {
		setEditingEntry(null);
	};

	const handleDelete = (id: string) => {
		deleteEntry(id);
		if (editingEntry?.id === id) {
			setEditingEntry(null);
		}
	};

	return (
		<main className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">Entradas</h3>

			<EntryForm
				onSubmit={handleSubmit}
				initialData={
					editingEntry
						? {
								description: editingEntry.description,
								amount: editingEntry.amount,
								date: editingEntry.date,
							}
						: undefined
				}
				onCancel={handleCancel}
				isEditing={!!editingEntry}
			/>

			<History
				type="entry"
				items={entries}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
		</main>
	);
}
