import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Reports() {
  // Sample data for the charts
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [2500, 2300, 2800, 2400, 2600, 2700],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
      {
        label: "Expenses",
        data: [1800, 1900, 2100, 1700, 2000, 2200],
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  };

  const pieChartData = {
    labels: [
      "Food & Dining",
      "Transportation",
      "Shopping",
      "Bills",
      "Entertainment",
      "Other",
    ],
    datasets: [
      {
        data: [30, 20, 15, 25, 10, 10],
        backgroundColor: [
          "rgba(34, 197, 94, 0.5)",
          "rgba(239, 68, 68, 0.5)",
          "rgba(59, 130, 246, 0.5)",
          "rgba(251, 191, 36, 0.5)",
          "rgba(139, 92, 246, 0.5)",
          "rgba(255, 0, 0, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Financial Reports</h1>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
          <Bar data={barChartData} />
        </div>

        {/* Expense Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}

export default Reports;
