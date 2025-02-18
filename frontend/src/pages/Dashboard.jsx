import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionAPI";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await getTransactions();
        const sortedTransactions = response.transactions.sort(
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
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };
    loadTransactions();
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
          <h2 className="text-xl font-semibold mb-4">Budget Alerts</h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-red-800 font-medium">
                Food & Dining budget is at 80%
              </p>
              <p className="text-sm text-red-600">
                {` You've spent $400 of your $500 budget`}
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 font-medium">
                Shopping budget is at 70%
              </p>
              <p className="text-sm text-yellow-600">
                You've spent $350 of your $500 budget
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
