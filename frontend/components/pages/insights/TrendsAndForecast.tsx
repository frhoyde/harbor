"use client";
import ViewDetails from "@/components/shared/ViewDetails";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import RevenueTrends from "./RevenueTrends";
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
const TrendsAndForecast = () => {
  return (
    <div className="insight-card">
      <div className="flex w-full border-b ">
        <div className="basis-1/2 px-2 border-r ">
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
        <div className="basis-1/2 px-2 pl-5 ">
          <RevenueTrends />
        </div>
      </div>
      <div className="pt-4">
        <div className="flex space-x-3 items-center">
          <h2>Demand Forecasting</h2>
          <p className="text-gray-400 text-xs">Previsions for year 2025</p>
        </div>
        <div className="mt-2 flex justify-between">
          <h3>Occupancy Rates</h3>
          <div className="flex items-center space-x-2">
            <h3>Expected Revenue </h3>
            <p className="text-xs text-green-400">+2.37%</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="grid grid-cols-12 gap-2 mt-3">
            <div className="col-span-4 text-xs flex gap-2 items-center">
              <p>Small storages</p>
              <p className="text-green-400">+10.5%</p>
            </div>
            <div className="col-start-5 col-span-4 text-xs flex gap-2 items-center">
              <p>Medium storages</p>
              <p className="text-green-400">+5%</p>
            </div>
            <div className="col-span-4 col-start-1 text-xs flex gap-2 items-center">
              <p>Large storages</p>
              <p className="text-red-400">-0.5%</p>
            </div>
            <div className="col-span-6 text-xs flex gap-2 items-center">
              <p>Climate - controlled storages</p>
              <p className="text-green-400">+15.5%</p>
            </div>
          </div>
          <div>
            <ViewDetails href="#" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsAndForecast;
