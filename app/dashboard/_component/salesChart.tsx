"use client"
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const SalesChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const staticData: ChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sales ($)',
          data: [1000, 2000, 1500, 2500, 3000, 3500],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(staticData);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, 
      },
      title: {
        display: true,
        text: 'Monthly Sales',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SalesChart;
