import { useState } from 'react';
import { useAddtransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

export const ExpenseTracker = () => {
	const navigate = useNavigate();
	const { addTransaction } = useAddtransaction();
	const { transactions, transactionTotals } = useGetTransactions();
	const { name, profilePhoto } = useGetUserInfo();

	const [description, setDescription] = useState('');
	const [transactionAmount, setTransactionAmount] = useState('');
	const [transactionType, setTransactionType] = useState('Expense');

	const { balance, income, expenses } = transactionTotals;

	const onSubmit = async (e) => {
		e.preventDefault();
		addTransaction({
			description,
			transactionAmount,
			transactionType,
		});

		setDescription('');
		setTransactionAmount('');
	};

	const signUserOut = async () => {
		try {
			await signOut(auth);
			localStorage.clear();
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="p-24 expense-tracker flex flex-col gap-12 bg-lightBlue">
				<div className="wrapper flex justify-between px-6 py-8 rounded-xl bg-white">
					<div className="text-black container flex flex-col items-stretch gap-5">
						<h1 className="text-2xl font-bold">
							{name} Expense Tracker
						</h1>
						<div className="text-black balance flex items-center gap-2">
							<h3>Your Balance: </h3>
							<h2 className="font-medium">{balance}</h2>
						</div>
						<div className="text-black summary">
							<div className="income flex items-center gap-2">
								<h4>Income: </h4>
								<p className="font-medium">{income}</p>
							</div>
							<div className="expenses flex items-center gap-2">
								<h4>Expenses: </h4>
								<p className="font-medium">{expenses}</p>
							</div>
						</div>
						<form
							className="add-transcation flex flex-col gap-2 w-1/2"
							onSubmit={onSubmit}
						>
							<input
								type="text"
								placeholder="Description"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="p-1 rounded-md border border-slate-300 outline-none focus:border-lightRed"
							/>
							<input
								type="number"
								placeholder="Amount"
								required
								value={transactionAmount}
								onChange={(e) =>
									setTransactionAmount(e.target.value)
								}
								className="p-1 rounded-md border border-slate-300 outline-none focus:border-lightRed"
							/>
							<div className="radio flex items-center gap-1">
								<input
									type="radio"
									id="expense"
									value="Expense"
									checked={transactionType === 'Expense'}
									onChange={(e) =>
										setTransactionType(e.target.value)
									}
									className="cursor-point w-3 h-3"
								/>
								<label
									htmlFor="expense"
									className="cursor-pointer font-regular"
								>
									Expense
								</label>
							</div>

							<div className="radio flex items-center gap-1">
								<input
									type="radio"
									id="income"
									value="Income"
									checked={transactionType === 'Income'}
									onChange={(e) =>
										setTransactionType(e.target.value)
									}
									className="cursor-point w-3 h-3"
								/>
								<label
									htmlFor="income"
									className="cursor-pointer font-regular"
								>
									Income
								</label>
							</div>

							<button
								type="submit"
								className="mt-4 px-12 py-2 rounded-md shadow-lg border border-lightRed bg-lightRed hover:bg-lightRedHover hover:border-lightRedHover transition-all duration-300 font-medium"
							>
								Add Transcation
							</button>
						</form>
					</div>
					{profilePhoto && (
						<div className="profile flex flex-col items-stretch gap-3">
							<img
								src={profilePhoto}
								alt="profilePhoto"
								className="profile photo rounded-full"
							/>
							<button
								className="font-medium text-lightRed"
								onClick={signUserOut}
							>
								Sign out
							</button>
						</div>
					)}
				</div>

				<div className="text-black transcations flex flex-col items-stretch gap-5 px-6 py-8 rounded-xl bg-white">
					<h3 className="text-2xl font-bold">Transactions</h3>
					<ul className="flex flex-col items-stretch gap-3">
						{transactions.map((transaction, index) => {
							const {
								description,
								transactionAmount,
								transactionType,
							} = transaction;
							return (
								<li
									key={index}
									className="bg-lightBlue p-2 rounded-lg shadow-md"
								>
									<h4>{description}</h4>
									<p>
										{transactionAmount} -{' '}
										<label
											className={
												transactionType === 'Expense'
													? 'text-red-600'
													: 'text-green-600'
											}
										>
											{transactionType}
										</label>
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};
