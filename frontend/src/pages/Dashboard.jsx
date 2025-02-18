import { Bar } from "react-chartjs-2";

function Dashboard() {
  // Sample data for the chart
  const recentTransactionsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Expenses",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Total Balance</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">$5,000.00</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Total Income</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 mt-2">$6,000.00</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Total Expenses
            </h3>
          </div>
          <p className="text-3xl font-bold text-red-600 mt-2">$1000.00</p>
        </div>
      </div>

      {/* Recent Transactions & Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {/* Transaction items */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Grocery Shopping
                  </p>
                  <p className="text-sm text-gray-500">Feb 20, 2024</p>
                </div>
              </div>
              <span className="text-red-600 font-medium">-$150.00</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Salary Deposit
                  </p>
                  <p className="text-sm text-gray-500">Feb 19, 2024</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">+$2,500.00</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Expenses</h2>
          <Bar data={recentTransactionsData} />
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
