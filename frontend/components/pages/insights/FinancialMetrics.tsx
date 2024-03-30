"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ViewDetails from "@/components/shared/ViewDetails";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const options = {
  responsive: true,
  scales: {
    x: {
      border: {
        display: true,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: true,
      },
      grid: {
        display: true,
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          return "$" + value;
        },
      },
      min: 210,
      max: 240,
    },
  },
};
const labels = [
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];
const data = {
  labels,
  datasets: [
    {
      label: "Metrics",
      data: [215, 215, 220, 220, 220, 232, 235, 230, 230, 235, 235, 235],
      borderColor: "#6EA7FF",
      backgroundColor: "#6EA7FF",
    },
  ],
};
const FinancialMetrics = () => {
  return (
    <div className="insight-card">
      <div className="flex justify-between  ">
        <h2>Financial Metrics</h2>
        <ViewDetails href="#" />
      </div>
      <div className="mt-3 ">
        <div className="flex justify-between">
          <h3>Average Revenue Per User (ARPU)</h3>
          <div className="flex space-x-2 text-sm">
            <div>
              <p className="">$236,95</p>
              <p className="text-[9px] text-gray-400 leading-none">
                from $217,59
              </p>
            </div>
            <p className="text-green-400">+8.9%</p>
          </div>
        </div>
        <div className="w-full ">
          <Line options={options} data={data} />
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center space-x-2">
            <h3>Churn Rate</h3>
            <p className="text-xs text-red-600 font-bold">3.9%</p>
          </div>
          <div className="flex items-center space-x-2">
            <h3>Cost per Acquisition</h3>
            <p className="text-xs text-red-600 font-bold">$189</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialMetrics;
