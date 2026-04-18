import { useState, useMemo } from 'react'
import './App.css'
import SummaryCards from './components/SummaryCards'
import AddTransactionForm from './components/AddTransactionForm'
import TransactionList from './components/TransactionList'
import ExpensesByCategoryChart from './components/ExpensesByCategoryChart'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  const filteredTransactions = useMemo(() =>
    transactions
      .filter(t => filterType === "all" || t.type === filterType)
      .filter(t => filterCategory === "all" || t.category === filterCategory),
    [transactions, filterType, filterCategory]
  );

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleAdd = ({ description, amount, type, category }) => {
    setTransactions(prev => [...prev, {
      id: Date.now(),
      description,
      amount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    }]);
  };

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <SummaryCards totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />

      <AddTransactionForm onAdd={handleAdd} />

      <ExpensesByCategoryChart transactions={transactions} />

      <TransactionList
        filteredTransactions={filteredTransactions}
        filterType={filterType} filterCategory={filterCategory}
        setFilterType={setFilterType} setFilterCategory={setFilterCategory}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App
