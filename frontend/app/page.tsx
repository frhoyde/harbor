import ApprovalsTable from "@/components/pages/approvals/ApprovalsTable";
import StorageMiniCarousel from "@/components/pages/dashboard/StorageMiniCarousel";
import StorageMap from "@/components/pages/explore/StorageMap";
import FinancialMetrics from "@/components/pages/insights/FinancialMetrics";
import MarketComparison from "@/components/pages/insights/MarketComparison";
import OccupancyRate from "@/components/pages/insights/OccupancyRate";
import PricingAnalysis from "@/components/pages/insights/PricingAnalysis";
import RevenueTrends from "@/components/pages/insights/RevenueTrends";
import GoButton from "@/components/shared/GoButton";
import { storages } from "@/lib/data";
import { CheckIcon, TimerIcon, XIcon } from "lucide-react";

const approvals = [
  {
    name: "Rate Change Request for 5’x10’ H&C",
    description:
      "Considering the recent rate changes on 2023-01-01 (+5.00) and 2023-03-15 (-3.00), it’s recommended to implement a rate increase of $7.50 on 2023-05-01. This adjustment aligns with market trends and ensures competitiveness while maximizing revenue for Public Storage. Additionally, competitors A and C have lower prices, presenting an opportunity to capture a higher share of the market.",
    submittedBy: "Harbor AI",
    size: "5’x10’",
    type: ["climate - controlled"],
    requestID: "#1",
    currentRate: 164,
    proposedRate: 170.0,

    status: "approved",
    createdAt: "2015-03-25T12:00:00Z",
  },
  {
    name: "Rate Change Request for 10’x10’ non-climate",
    description:
      "Based on recent market analysis, proposing a rate increase of $8.50 for 10’x10’ non-climate storage units effective from 2023-06-01. This adjustment aims to optimize revenue streams and maintain competitive pricing against market rivals.",
    submittedBy: "Peak Analytica",
    size: "10’x10’",
    type: ["non-climate", "large", "small"],
    requestID: "#2",
    currentRate: 280,
    proposedRate: 208.5,

    status: "pending",
    createdAt: "2019-10-18T12:00:00Z",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="card w-full">
        <div className="mb-4 flex justify-between">
          <h2>
            Approvals Overview{" "}
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
          <ApprovalsTable approvals={approvals} />
          <div className="flex justify-center mt-4">
            <GoButton href="/approvals" name="Approvals" />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="card basis-8/12">
          <div className="flex justify-between">
            <h2>Insights Overview</h2>
            <GoButton href="/insights" name="Insights" />
          </div>
          <div className="mt-4 flex gap-3">
            <div className="basis-8/12   ">
              <div className="flex gap-3">
                <div className="basis-1/2">
                  <OccupancyRate />
                </div>
                <div className="basis-1/2">
                  <RevenueTrends />
                </div>
              </div>
              <div className="">
                <MarketComparison />
              </div>
            </div>
            <div className="basis-4/12 flex flex-col gap-3">
              <PricingAnalysis />
              <FinancialMetrics />
            </div>
          </div>
        </div>
        <div className=" basis-4/12">
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
