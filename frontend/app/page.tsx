import ApprovalsTable from "@/components/pages/approvals/ApprovalsTable";
import StorageMiniCarousel from "@/components/pages/dashboard/StorageMiniCarousel";
import StorageMap from "@/components/pages/explore/StorageMap";
import FinancialMetrics from "@/components/pages/insights/FinancialMetrics";
import MarketComparison from "@/components/pages/insights/MarketComparison";
import OccupancyRate from "@/components/pages/insights/OccupancyRate";
import PricingAnalysis from "@/components/pages/insights/PricingAnalysis";
import RevenueTrends from "@/components/pages/insights/RevenueTrends";
import GoButton from "@/components/shared/GoButton";
import { approvalsOverview, storages } from "@/lib/data";
import { CheckIcon, TimerIcon, XIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="card w-full">
        <div className="mb-4 flex justify-between">
          <h2>
            Proposals Overview{" "}
            <span className="text-gray-400 text-sm font-normal">
              (latest updates)
            </span>
          </h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-sm text-green-500">
              <div className="h-6 w-6 rounded-full grid place-content-center bg-green-500">
                <CheckIcon className="h-3 w-3 text-white" />
              </div>
              <p>4</p>
            </div>
            <div className="flex items-center space-x-1 text-sm text-yellow-500">
              <div className="h-6 w-6 rounded-full grid place-content-center bg-yellow-500">
                <TimerIcon className="h-3 w-3 text-white" />
              </div>
              <p>3</p>
            </div>
            <div className="flex items-center space-x-1 text-sm text-red-500">
              <div className="h-6 w-6 rounded-full grid place-content-center bg-red-500">
                <XIcon className="h-3 w-3 text-white" />
              </div>
              <p>5</p>
            </div>
          </div>
        </div>
        <div>
          <ApprovalsTable approvals={approvalsOverview} />
          <div className="flex justify-center mt-4">
            <GoButton href="/proposals" name="Proposals" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="card col-span-8">
          <div className="flex justify-between">
            <h2>Insights Overview</h2>
            <GoButton href="/insights" name="Insights" />
          </div>
          <div className="mt-4 grid grid-cols-12 gap-3">
            <div className="col-span-7  ">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <OccupancyRate />
                </div>
                <div className="col-span-6">
                  <RevenueTrends />
                </div>
              </div>
              <div className="">
                <MarketComparison />
              </div>
            </div>
            <div className="col-span-5 flex flex-col gap-3">
              <PricingAnalysis />
              <FinancialMetrics />
            </div>
          </div>
        </div>
        <div className=" col-span-4">
          <div className="card">
            <div className="flex justify-between">
              <h2>Map Overview</h2>
              <GoButton href="/explore" name="Explore" />
            </div>
            <div className="w-full h-[230px] mt-4">
              <StorageMap storages={storages} zoom={11.5} />
            </div>
            <div className="mt-2">
              <StorageMiniCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
