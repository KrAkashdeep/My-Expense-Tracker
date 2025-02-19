import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionAPI";
import { getBudgets } from "../api/budgetAPI";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [topBudgets, setTopBudgets] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [transactionsResponse, budgetsResponse] = await Promise.all([
          getTransactions(),
          getBudgets(),
        ]);

        const sortedTransactions = transactionsResponse.transactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactions(sortedTransactions);

        // Calculate totals
        const { income, expense } = sortedTransactions.reduce(
          (acc, transaction) => {
            if (transaction.type === "Income") {
              acc.income += transaction.amount;
            } else {
              acc.expense += transaction.amount;
            }
            return acc;
          },
          { income: 0, expense: 0 }
        );

        setTotalIncome(income);
        setTotalExpense(expense);

        // Process chart data for last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date;
        }).reverse();

        const expensesByDay = sortedTransactions
          .filter((t) => t.type === "Expense")
          .reduce((acc, transaction) => {
            const date = new Date(transaction.date).toLocaleDateString();
            acc[date] = (acc[date] || 0) - transaction.amount;
            return acc;
          }, {});

        const chartLabels = last7Days.map((date) =>
          date.toLocaleDateString("en-US", { weekday: "short" })
        );

        const chartValues = last7Days.map((date) => {
          const dateKey = date.toLocaleDateString();
          return expensesByDay[dateKey] || 0;
        });

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Expenses",
              data: chartValues,
              backgroundColor: "rgba(239, 68, 68, 0.5)",
            },
          ],
        });

        // Calculate budget statuses
        const categoryExpenses = transactionsResponse.transactions
          .filter((t) => t.type === "Expense")
          .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
            return acc;
          }, {});

        const budgetsWithStatus = budgetsResponse.budget
          .map((budget) => {
            const spent = categoryExpenses[budget.category] || 0;
            const percentage = (spent / budget.amount) * 100;

            return {
              category: budget.category,
              spent,
              total: budget.amount,
              percentage,
              status:
                percentage >= 100
                  ? "over"
                  : percentage >= 80
                  ? "warning"
                  : "good",
            };
          })
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 2); // Get top 2 budgets by usage

        setTopBudgets(budgetsWithStatus);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className="container mx-auto px-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Total Balance</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ₹{(totalIncome + totalExpense).toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Total Income</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Total Expenses
            </h3>
          </div>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ₹{totalExpense.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Transactions & Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`${
                    transaction.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-medium`}
                >
                  {transaction.type === "Income" ? "+" : ""}₹
                  {transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Expenses</h2>
          <Bar data={chartData} />
        </div>
      </div>

      {/* Budget Alerts */}
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topBudgets.map((budget, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  budget.status === "over"
                    ? "bg-red-50"
                    : budget.status === "warning"
                    ? "bg-yellow-50"
                    : "bg-green-50"
                }`}
              >
                <p
                  className={`font-medium ${
                    budget.status === "over"
                      ? "text-red-800"
                      : budget.status === "warning"
                      ? "text-yellow-800"
                      : "text-green-800"
                  }`}
                >
                  {budget.category}
                </p>
                <p
                  className={`text-sm ${
                    budget.status === "over"
                      ? "text-red-600"
                      : budget.status === "warning"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {budget.percentage.toFixed(1)}% used (
                  {budget.spent.toFixed(2)}/{budget.total.toFixed(2)})
                </p>
              </div>
            ))}
            {/* Fill empty slots if less than 2 budgets */}
            {Array.from({ length: 2 - topBudgets.length }).map((_, index) => (
              <div key={index + 2} className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">Within Limits</p>
                <p className="text-sm text-green-600">No budget concerns</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
