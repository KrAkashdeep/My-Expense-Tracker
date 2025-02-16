import { useState } from "react";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    // Sample initial transaction
    {
      id: 1,
      date: "2024-02-20",
      description: "Grocery Shopping",
      category: "Food & Dining",
      amount: -150.0,
      type: "Expense",
    },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "Others",
    amount: "",
    type: "Expense",
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (
      !newTransaction.date ||
      !newTransaction.description ||
      !newTransaction.amount
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setTransactions([
      ...transactions,
      {
        ...newTransaction,
        id: Date.now(),
        amount:
          parseFloat(newTransaction.amount) *
          (newTransaction.type === "Expense" ? -1 : 1),
      },
    ]);

    setNewTransaction({
      date: "",
      description: "",
      category: "Food & Dining",
      amount: "",
      type: "Expense",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Food & Dining</option>
              <option>Shopping</option>
              <option>Transportation</option>
              <option>Bills & Utilities</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>All Types</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleAddTransaction}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTransaction.date}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTransaction.category}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        category: e.target.value,
                      })
                    }
                  >
                    <option>Food & Dining</option>
                    <option>Shopping</option>
                    <option>Transportation</option>
                    <option>Bills & Utilities</option>
                    <option>Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTransaction.type}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        type: e.target.value,
                      })
                    }
                  >
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.date}
                </td>
                <td className="px-6 py-4">{transaction.description}</td>
                <td className="px-6 py-4">{transaction.category}</td>
                <td
                  className={`px-6 py-4 ${
                    transaction.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "Expense"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
