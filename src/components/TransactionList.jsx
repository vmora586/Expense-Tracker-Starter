import { CATEGORIES } from '../constants'

function TransactionList({
  filteredTransactions, filterType, filterCategory,
  setFilterType, setFilterCategory, onDelete,
}) {
  const handleDeleteClick = (id, description) => {
    if (window.confirm(`Delete transaction: ${description}?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '32px 0' }}>
                No transactions match the selected filters.
              </td>
            </tr>
          ) : filteredTransactions.map(t => (
            <tr key={t.id}>
              <td className="date-cell">{t.date}</td>
              <td>{t.description}</td>
              <td><span className="category-badge">{t.category}</span></td>
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
              </td>
              <td>
                <button
                  className="delete-btn"
                  aria-label={`Delete transaction: ${t.description}`}
                  onClick={() => handleDeleteClick(t.id, t.description)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
