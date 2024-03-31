"use client";
import ViewDetails from "@/components/shared/ViewDetails";

import { cn } from "@/lib/utils";
import RevenueTrends from "./RevenueTrends";
import OccupancyRate from "./OccupancyRate";

const TrendsAndForecast = () => {
  return (
    <div className={cn("card")}>
      <div className="flex w-full border-b ">
        <div className="basis-1/2 px-2 border-r ">
          <OccupancyRate />
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
