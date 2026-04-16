import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function ExpensesByCategoryChart({ transactions }) {
  const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

  const data = categories
    .map((category) => ({
      category,
      amount: transactions
        .filter((t) => t.type === 'expense' && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0),
    }))
    .filter((item) => item.amount > 0);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="chart-container">
      <h2>Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
          <Bar dataKey="amount" fill="#F04438" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensesByCategoryChart;
