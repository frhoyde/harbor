"use client";
import { usePathname } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ViewDetails from "@/components/shared/ViewDetails";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const options: ChartOptions<"line"> = {
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
  const pathname = usePathname();
  const isDashboard = pathname === "/";
  return (
    <div>
      <div className={cn("card", { "bg-gray-200": isDashboard })}>
        <div className="flex justify-between  ">
          {isDashboard ? (
            <h3 className="text-white">Financial Metrics</h3>
          ) : (
            <h2>Financial Metrics</h2>
          )}
          {!isDashboard ? <ViewDetails href="#" /> : null}
        </div>
        <div className="mt-3 ">
          <div className="flex justify-between">
            <div className={cn({ "flex flex-col gap-2": isDashboard })}>
              <h3>Average Revenue Per User (ARPU)</h3>
              {isDashboard ? (
                <div className="flex gap-2 items-center mb-2">
                  <p className="">$236,95</p>
                  <p className="text-[9px] text-gray-500 leading-none">
                    from $217,59
                  </p>
                </div>
              ) : null}
            </div>

            {isDashboard ? (
              <p className="text-green-400">+8.9%</p>
            ) : (
              <div className="flex space-x-2 text-sm">
                <div>
                  <p className="">$236,95</p>
                  <p className="text-[9px] text-gray-400 leading-none">
                    from $217,59
                  </p>
                </div>
                <p className="text-green-400">+8.9%</p>
              </div>
            )}
          </div>
          <div className="w-full ">
            <Line options={options} data={data} />
          </div>
          {!isDashboard ? (
            <div className="flex justify-between mt-4">
              <div className={cn("flex items-center space-x-2")}>
                <h3>Churn Rate</h3>
                <p className="text-xs text-red-600 font-bold">3.9%</p>
              </div>
              <div className={cn("flex items-center space-x-2")}>
                <h3>{isDashboard ? "CAC" : "Cost per Acquisition"}</h3>
                <p className="text-xs text-red-600 font-bold">$189</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {isDashboard ? (
        <div className="flex justify-between mt-2 ">
          <div
            className={cn("flex items-center space-x-2", {
              "p-2 rounded-md border border-red-600": isDashboard,
            })}
          >
            <h3>Churn Rate</h3>
            <p className="text-xs text-red-600 font-bold">3.9%</p>
          </div>
          <div
            className={cn("flex items-center space-x-2", {
              "p-2 rounded-md border border-red-600": isDashboard,
            })}
          >
            <h3>{isDashboard ? "CAC" : "Cost per Acquisition"}</h3>
            <p className="text-xs text-red-600 font-bold">$189</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FinancialMetrics;
