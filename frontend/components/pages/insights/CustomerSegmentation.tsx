"use client";

import ViewDetails from "@/components/shared/ViewDetails";
import { Progress } from "@/components/ui/progress";
import {
  Chart as ChartJS,
  ArcElement,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement);

export const data: ChartData<"doughnut"> = {
  labels: ["Short term customers", "Long term customers"],
  datasets: [
    {
      label: "Customer Percentage",
      data: [42, 58],
      backgroundColor: ["#FFB703", "#FFACFC"],
    },
  ],
};
const options: ChartOptions<"doughnut"> = {
  responsive: true,
  layout: {
    padding: 10,
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
};

const CustomerSegmentation = () => {
  return (
    <div className="card">
      <div className="flex justify-between  ">
        <h2>Customer Segmentation</h2>
        <ViewDetails href="#" />
      </div>
      <div className="mt-3 flex  items-center gap-8">
        <div className="basis-[65%] space-y-2">
          <div className="flex gap-2 items-center text-xs">
            <p className="min-w-max font-bold mr-4">Short term customers</p>
            <Progress value={42} className=" bg-transparent progress-yellow " />
            <p className="text-[#FFB703]">42%</p>
          </div>
          <div className="flex gap-2 items-center text-xs">
            <p className="min-w-max font-bold mr-4">Long term customers</p>
            <Progress value={58} className=" bg-transparent progress-pink " />
            <p className="text-[#FFACFC]">58%</p>
          </div>
        </div>
        <div className="w-[104px]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CustomerSegmentation;
