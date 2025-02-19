import { useState, useEffect } from "react";
import { getBudgets, createBudget } from "../api/budgetAPI";
import { getTransactions } from "../api/transactionAPI";
import BudgetModal from "../components/BudgetModal";

function Budgets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [budgetsResponse, transactionsResponse] = await Promise.all([
          getBudgets(),
          getTransactions(),
        ]);

        const categoryExpenses = transactionsResponse.transactions
          .filter((t) => t.type === "Expense")
          .reduce((acc, transaction) => {
            acc[transaction.category] =
              (acc[transaction.category] || 0) + Math.abs(transaction.amount);
            return acc;
          }, {});

        setBudgets(
          budgetsResponse.budget.map((b) => ({
            category: b.category,
            spent: categoryExpenses[b.category] || 0,
            total: b.amount,
          }))
        );
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  const handleNewBudget = async (budgetData) => {
    try {
      const savedBudget = await createBudget(budgetData);
      setBudgets((prev) => [
        ...prev,
        {
          category: savedBudget.category,
          spent: 0,
          total: savedBudget.amount,
        },
      ]);
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const calculateTotals = () => {
    return budgets.reduce(
      (acc, budget) => ({
        total: acc.total + budget.total,
        spent: acc.spent + budget.spent,
      }),
      { total: 0, spent: 0 }
    );
  };

  const totals = calculateTotals();
  const remaining = totals.total - totals.spent;

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budgets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Budget
        </button>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Budget</h3>
          <p className="text-3xl font-bold text-blue-600">
            ₹{totals.total.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Monthly allocation</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Spent</h3>
          <p className="text-3xl font-bold text-red-600">
            ₹{totals.spent.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            {((totals.spent / totals.total) * 100).toFixed(0)}% of total budget
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Remaining</h3>
          <p className="text-3xl font-bold text-green-600">
            ₹{remaining.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            {((remaining / totals.total) * 100).toFixed(0)}% of total budget
          </p>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Budget Categories</h2>
        <div className="space-y-6">
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.total) * 100;
            const isOverBudget = percentage > 80;

            return (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{budget.category}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{budget.spent} of ₹{budget.total}
                    </p>
                  </div>
                  <span
                    className={`font-medium ${
                      isOverBudget ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      isOverBudget ? "bg-red-600" : "bg-green-600"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleNewBudget}
      />
    </div>
  );
}

export default Budgets;
