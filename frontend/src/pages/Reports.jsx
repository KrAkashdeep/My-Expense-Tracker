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
import { useState, useEffect, useMemo } from "react";
import { getTransactions } from "../api/transactionAPI";

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
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.transactions);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };
    loadData();
  }, []);

  // Process data for charts
  const { monthlyData, categoryData } = useMemo(() => {
    const monthly = {};
    const categories = {};

    transactions.forEach((transaction) => {
      // Process monthly data
      const monthYear = new Date(transaction.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!monthly[monthYear]) {
        monthly[monthYear] = { income: 0, expense: 0 };
      }

      if (transaction.type === "Income") {
        monthly[monthYear].income += transaction.amount;
      } else {
        monthly[monthYear].expense += Math.abs(transaction.amount);
      }

      // Process category data
      if (transaction.type === "Expense") {
        categories[transaction.category] =
          (categories[transaction.category] || 0) +
          Math.abs(transaction.amount);
      }
    });

    // Sort monthly data by date
    const sortedMonths = Object.keys(monthly).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return {
      monthlyData: {
        labels: sortedMonths,
        datasets: [
          {
            label: "Income",
            data: sortedMonths.map((m) => monthly[m].income),
            backgroundColor: "rgba(34, 197, 94, 0.5)",
          },
          {
            label: "Expenses",
            data: sortedMonths.map((m) => monthly[m].expense),
            backgroundColor: "rgba(239, 68, 68, 0.5)",
          },
        ],
      },
      categoryData: {
        labels: Object.keys(categories),
        datasets: [
          {
            data: Object.values(categories),
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
      },
    };
  }, [transactions]);

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
          <Bar
            data={monthlyData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Monthly Financial Overview",
                },
              },
            }}
          />
        </div>

        {/* Expense Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
          <Pie
            data={categoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;
