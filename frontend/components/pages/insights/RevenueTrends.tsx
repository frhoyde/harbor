"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: true,
      },
      ticks: {
        display: false,
      },
    },
  },
};
const data: ChartData<"line"> = {
  labels: MONTHS,
  datasets: [
    {
      label: "2022",
      data: [30, 25, 45, 47, 59, 55, 89, 75, 70, 51, 69, 90],
      borderColor: "#0700AF",
      backgroundColor: "#0700AF",
    },
    {
      label: "2023",
      data: [40, 34, 60, 80, 80, 90, 102, 102, 82, 75, 77, 105],
      borderColor: "#0031FF",
      backgroundColor: "#0031FF",
    },
    {
      label: "2024",
      data: [50, 55, 70, 95, 99, 102, 120, 115, 100, 110, 120, 130],
      borderColor: "#8000FF",
      backgroundColor: "#8000FF",
    },
  ],
};
const RevenueTrends = () => {
  return (
    <>
      <div className="flex justify-between ">
        <h2>Revenue Trends</h2>
        <div className="flex items-center space-x-2">
          <p className="text-gray-400 text-xs">Last 3 years</p>
          <p className="text-xs text-green-400">+0.53%</p>
        </div>
      </div>
      <div className="mt-2 ">
        <Line options={options} data={data} />
        <div className="mt-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#0700AF] rounded-full"></div>
              <p className="text-xs">2022</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#0031FF] rounded-full"></div>
              <p className="text-xs">2023</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#8000FF] rounded-full"></div>
              <p className="text-xs">2024</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenueTrends;
