import { useState } from 'react';
import { useFinance } from '../contexts/useFinance';
import type { Bill, BillType } from '../contexts/FinanceContext';
import {
	Calendar,
	CreditCard,
	Repeat,
	Receipt,
	AlertTriangle,
	Check,
	Trash2,
	Edit2,
} from 'lucide-react';

export default function ContasaPagar() {
	const { bills, addBill, updateBill, deleteBill, toggleBillPaid } =
		useFinance();
	const [editingBill, setEditingBill] = useState<Bill | null>(null);

	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [type, setType] = useState<BillType>('conta');
	const [totalInstallments, setTotalInstallments] = useState('');
	const [currentInstallment, setCurrentInstallment] = useState('');

	const resetForm = () => {
		setDescription('');
		setAmount('');
		setDueDate('');
		setType('conta');
		setTotalInstallments('');
		setCurrentInstallment('');
		setEditingBill(null);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

    // Acho que é assim
		const billData: Bill = {
			id: editingBill?.id || Date.now().toString(),
			description,
			amount,
			dueDate,
			type,
			isPaid: editingBill?.isPaid || false,
			...(type === 'parcelamento' && {
				totalInstallments: parseInt(totalInstallments) || undefined,
				currentInstallment: parseInt(currentInstallment) || undefined,
			}),
		};

		if (editingBill) {
			updateBill(editingBill.id, billData);
		} else {
			addBill(billData);
		}

		resetForm();
	};

  //Edicao
	const handleEdit = (bill: Bill) => {
		setEditingBill(bill);
		setDescription(bill.description);
		setAmount(bill.amount);
		setDueDate(bill.dueDate);
		setType(bill.type);
		setTotalInstallments(bill.totalInstallments?.toString() || '');
		setCurrentInstallment(bill.currentInstallment?.toString() || '');
	};

	const handleCancel = () => {
		resetForm();
	};

  //Calculo simpleszinho
	const getDaysUntilDue = (dueDate: string) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const due = new Date(dueDate);
		const diffTime = due.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const getAlertStatus = (bill: Bill) => {
		if (bill.isPaid) return 'paid';
		const days = getDaysUntilDue(bill.dueDate);
		if (days < 0) return 'overdue';
		if (days <= 3) return 'urgent';
		if (days <= 7) return 'warning';
		return 'normal';
	};

	const typeConfig: Record<
		BillType,
		{ icon: React.ReactNode; label: string; color: string }
	> = {
		parcelamento: {
			icon: <CreditCard size={16} />,
			label: 'Parcelamento',
			color: 'text-purple-400',
		},
		assinatura: {
			icon: <Repeat size={16} />,
			label: 'Assinatura',
			color: 'text-blue-400',
		},
		conta: {
			icon: <Receipt size={16} />,
			label: 'Conta',
			color: 'text-orange-400',
		},
	};

	const sortedBills = [...bills].sort((a, b) => {
		if (a.isPaid !== b.isPaid) return a.isPaid ? 1 : -1;
		return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
	});

	const upcomingBills = bills.filter(
		(bill) => !bill.isPaid && getDaysUntilDue(bill.dueDate) <= 7,
	);

	return (
		<main className="col-span-10 p-6 bg-stone-900 overflow-y-auto">
			<h3 className="text-2xl text-white font-semibold mb-6">
				Contas a Pagar
			</h3>

			{upcomingBills.length > 0 && (
				<div className="bg-amber-900/30 border border-amber-600 rounded-xl p-4 mb-6">
					<div className="flex items-center gap-2 mb-3">
						<AlertTriangle className="text-amber-400" size={20} />
						<h4 className="text-amber-400 font-semibold">
							Alertas de Vencimento
						</h4>
					</div>
					<div className="space-y-2">
						{upcomingBills.map((bill) => {
							const days = getDaysUntilDue(bill.dueDate);
							const status = getAlertStatus(bill);
							return (
								<div
									key={bill.id}
									className={`flex justify-between items-center p-2 rounded-lg ${
										status === 'overdue'
											? 'bg-red-900/50'
											: status === 'urgent'
												? 'bg-orange-900/50'
												: 'bg-amber-900/50'
									}`}
								>
									<span className="text-white">
										{bill.description}
									</span>
									<span
										className={`text-sm font-medium ${
											status === 'overdue'
												? 'text-red-400'
												: status === 'urgent'
													? 'text-orange-400'
													: 'text-amber-400'
										}`}
									>
										{days < 0
											? `Vencido há ${Math.abs(days)} dia(s)`
											: days === 0
												? 'Vence hoje!'
												: `Vence em ${days} dia(s)`}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			)}

			<div className="bg-stone-800 rounded-xl p-6 mb-6 border border-stone-700">
				<h4 className="text-white font-semibold text-lg mb-4">
					{editingBill ? 'Editar Conta' : 'Adicionar Nova Conta'}
				</h4>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<div>
							<label className="block text-stone-300 text-sm mb-2">
								Descrição
							</label>
							<input
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
								placeholder="Ex: Netflix, Cartão de crédito..."
								required
							/>
						</div>
						<div>
							<label className="block text-stone-300 text-sm mb-2">
								Valor (R$)
							</label>
							<input
								type="number"
								step="0.01"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
								placeholder="0.00"
								required
							/>
						</div>
						<div>
							<label className="block text-stone-300 text-sm mb-2">
								Data de Vencimento
							</label>
							<input
								type="date"
								value={dueDate}
								onChange={(e) => setDueDate(e.target.value)}
								className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
								required
							/>
						</div>
						<div>
							<label className="block text-stone-300 text-sm mb-2">
								Tipo
							</label>
							<select
								value={type}
								onChange={(e) =>
									setType(e.target.value as BillType)
								}
								className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
							>
								<option value="conta">Conta</option>
								<option value="assinatura">Assinatura</option>
								<option value="parcelamento">
									Parcelamento
								</option>
							</select>
						</div>
					</div>

					{type === 'parcelamento' && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-stone-300 text-sm mb-2">
									Parcela Atual
								</label>
								<input
									type="number"
									min="1"
									value={currentInstallment}
									onChange={(e) =>
										setCurrentInstallment(e.target.value)
									}
									className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
									placeholder="Ex: 3"
								/>
							</div>
							<div>
								<label className="block text-stone-300 text-sm mb-2">
									Total de Parcelas
								</label>
								<input
									type="number"
									min="1"
									value={totalInstallments}
									onChange={(e) =>
										setTotalInstallments(e.target.value)
									}
									className="w-full bg-stone-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
									placeholder="Ex: 12"
								/>
							</div>
						</div>
					)}

					<div className="flex gap-2">
						<button
							type="submit"
							className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
						>
							{editingBill ? 'Atualizar Conta' : 'Adicionar Conta'}
						</button>
						{editingBill && (
							<button
								type="button"
								onClick={handleCancel}
								className="bg-stone-600 hover:bg-stone-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
							>
								Cancelar
							</button>
						)}
					</div>
				</form>
			</div>

			<div className="bg-stone-800 rounded-xl border border-stone-700 overflow-hidden">
				<div className="p-4 border-b border-stone-700">
					<h4 className="text-white font-semibold">
						Todas as Contas
					</h4>
				</div>
				<div className="divide-y divide-stone-700">
					{sortedBills.length === 0 ? (
						<div className="p-8 text-center text-stone-400">
							Nenhuma conta registrada ainda.
						</div>
					) : (
						sortedBills.map((bill) => {
							const status = getAlertStatus(bill);
							const days = getDaysUntilDue(bill.dueDate);
							const config = typeConfig[bill.type];

							return (
								<div
									key={bill.id}
									className={`p-4 hover:bg-stone-750 transition-colors ${
										bill.isPaid ? 'opacity-60' : ''
									}`}
								>
									<div className="flex justify-between items-start gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-1">
												<span
													className={config.color}
												>
													{config.icon}
												</span>
												<p
													className={`text-white font-medium ${bill.isPaid ? 'line-through' : ''}`}
												>
													{bill.description}
												</p>
												<span
													className={`text-xs px-2 py-0.5 rounded ${config.color} bg-stone-700`}
												>
													{config.label}
												</span>
												{bill.type === 'parcelamento' &&
													bill.currentInstallment &&
													bill.totalInstallments && (
														<span className="text-xs text-stone-400">
															({bill.currentInstallment}/
															{bill.totalInstallments})
														</span>
													)}
											</div>
											<div className="flex items-center gap-4 text-sm">
												<span className="text-stone-400 flex items-center gap-1">
													<Calendar size={14} />
													{new Date(
														bill.dueDate,
													).toLocaleDateString(
														'pt-BR',
													)}
												</span>
												{!bill.isPaid && (
													<span
														className={`text-xs font-medium ${
															status === 'overdue'
																? 'text-red-400'
																: status ===
																	  'urgent'
																	? 'text-orange-400'
																	: status ===
																		  'warning'
																		? 'text-amber-400'
																		: 'text-stone-400'
														}`}
													>
														{days < 0
															? `Vencido há ${Math.abs(days)} dia(s)`
															: days === 0
																? 'Vence hoje!'
																: `Vence em ${days} dia(s)`}
													</span>
												)}
												{bill.isPaid && (
													<span className="text-green-400 text-xs flex items-center gap-1">
														<Check size={14} />
														Pago
													</span>
												)}
											</div>
										</div>
										<div className="flex items-center gap-3">
											<span className="text-amber-400 font-semibold text-lg">
												R${' '}
												{parseFloat(bill.amount).toFixed(
													2,
												)}
											</span>
											<div className="flex gap-1">
												<button
													onClick={() =>
														toggleBillPaid(bill.id)
													}
													className={`p-2 rounded-lg transition-colors cursor-pointer ${
														bill.isPaid
															? 'bg-stone-600 hover:bg-stone-500 text-stone-300'
															: 'bg-green-600 hover:bg-green-700 text-white'
													}`}
													title={
														bill.isPaid
															? 'Marcar como não pago'
															: 'Marcar como pago'
													}
												>
													<Check size={16} />
												</button>
												<button
													onClick={() =>
														handleEdit(bill)
													}
													className="p-2 bg-stone-600 hover:bg-stone-500 text-white rounded-lg transition-colors cursor-pointer"
													title="Editar"
												>
													<Edit2 size={16} />
												</button>
												<button
													onClick={() =>
														deleteBill(bill.id)
													}
													className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
													title="Excluir"
												>
													<Trash2 size={16} />
												</button>
											</div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
		</main>
	);
}
