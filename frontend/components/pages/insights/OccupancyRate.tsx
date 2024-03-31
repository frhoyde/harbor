"use client";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { usePathname } from "next/navigation";
import ViewDetails from "@/components/shared/ViewDetails";
import { cn } from "@/lib/utils";
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
  labels,
  datasets: [
    {
      label: "Metrics",
      data: [40, 34, 60, 120, 80, 77, 33, 22, 28, 45, 69, 99],
      borderColor: "#FFB703",
      backgroundColor: "#FFB703",
    },
  ],
};
const OccupancyRate = () => {
  const pathname = usePathname();
  const isDashboard = pathname === "/";
  return (
    <div>
      <div className="flex justify-between ">
        <h2>Occupancy Rates</h2>
        <div className="flex items-center space-x-2">
          <p className="text-gray-400 text-xs">Last 10 years</p>
          <p className="text-xs text-green-400">+80.5%</p>
        </div>
      </div>
      <div className="mt-2">
        <Line options={options} data={data} />
        <div className="flex gap-1 mt-2">
          <button
            className={cn(
              badgeVariants({ variant: "outline" }),
              "border-[#FFB703] "
            )}
          >
            Small
          </button>
          <button className={cn(badgeVariants({ variant: "outline" }))}>
            Medium
          </button>
          <button className={cn(badgeVariants({ variant: "outline" }))}>
            Large
          </button>
          <button className={cn(badgeVariants({ variant: "outline" }))}>
            Climate-Controlled
          </button>
        </div>
        <div className="flex justify-end mt-3 pb-3">
          <ViewDetails href="#" />
        </div>
      </div>
    </div>
  );
};

export default OccupancyRate;
