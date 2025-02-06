"use client";
// components/OrderOverviewChart.tsx
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";

// Register necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define types for chart data
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const OrderOverviewChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  // Static data for completed and pending orders
  useEffect(() => {
    const staticOrderData = [
      { id: 1, status: "completed", total: 100 },
      { id: 2, status: "pending", total: 200 },
      { id: 3, status: "completed", total: 150 },
      { id: 4, status: "completed", total: 300 },
      { id: 5, status: "pending", total: 50 },
    ];

    // Count completed and pending orders
    const completedOrders = staticOrderData.filter(order => order.status === "completed").length;
    const pendingOrders = staticOrderData.filter(order => order.status === "pending").length;

    // Prepare chart data
    setChartData({
      labels: ["Completed Orders", "Pending Orders"],
      datasets: [
        {
          label: "Orders",
          data: [completedOrders, pendingOrders],
          backgroundColor: ["#28a745", "#dc3545"], 
          borderColor: ["#28a745", "#dc3545"], 
          borderWidth: 1, 
        },
      ],
    });
  }, []);

  // Correct typing for chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, 
      },
      title: {
        display: true,
        text: "Order Overview (Completed vs Pending)",
      },
    },
  };

  return (
    <div className="">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Order Overview</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OrderOverviewChart;
