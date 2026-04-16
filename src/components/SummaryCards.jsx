function SummaryCards({ totalIncome, totalExpenses, balance }) {
  return (
    <div className="summary">
      <div className="summary-card income">
        <h3>Income</h3>
        <p className="income-amount">${totalIncome.toLocaleString()}</p>
      </div>
      <div className="summary-card expense">
        <h3>Expenses</h3>
        <p className="expense-amount">${totalExpenses.toLocaleString()}</p>
      </div>
      <div className="summary-card balance">
        <h3>Balance</h3>
        <p className={`balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
          {balance < 0 ? '-' : ''}${Math.abs(balance).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default SummaryCards
