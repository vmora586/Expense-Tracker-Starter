import { useState } from 'react'
import { CATEGORIES } from '../constants'

function AddTransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!description.trim()) newErrors.description = "Please enter a description for this transaction.";
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = "Please enter a valid amount greater than zero.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onAdd({ description: description.trim(), amount: parseFloat(amount), type, category });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
    setErrors({});
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <input
            type="text"
            placeholder="Description"
            value={description}
            className={errors.description ? "input-error" : ""}
            onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: undefined })); }}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>
        <div className="field-group">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            min="0.01"
            step="0.01"
            className={errors.amount ? "input-error" : ""}
            onChange={(e) => { setAmount(e.target.value); setErrors(prev => ({ ...prev, amount: undefined })); }}
          />
          {errors.amount && <span className="error-msg">{errors.amount}</span>}
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTransactionForm
