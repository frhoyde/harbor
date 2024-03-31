"use client";
import { cn } from "@/lib/utils";
import { Chart as ChartJS, ChartOptions, ChartData } from "chart.js";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isDashboard = pathname === "/";
  return (
    <div>
      <div className={cn({ "bg-gray-200 card": isDashboard })}>
        <div className="flex justify-between ">
          {isDashboard ? (
            <div
              className={cn("flex flex-col gap-2 ", { "gap-1": isDashboard })}
            >
              <h3 className="text-white">Revenue Trends</h3>
              <p className="text-white text-xs">Last 3 years</p>
            </div>
          ) : (
            <h2>Revenue Trends</h2>
          )}
          {isDashboard ? (
            <p className="text-xs text-green-400">+0.53%</p>
          ) : (
            <div className="flex items-center space-x-2">
              <p className="text-gray-400 text-xs">Last 3 years</p>
              <p className="text-xs text-green-400">+0.53%</p>
            </div>
          )}
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
      </div>
      {isDashboard ? (
        <div className=" mt-2 p-2 rounded-md border border-green-600">
          <div className="flex items-center space-x-2">
            <h3>Expected Revenue</h3>
            <p className="text-xs text-green-600 font-bold">+2.37%</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RevenueTrends;
