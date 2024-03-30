"use client";

import ViewDetails from "@/components/shared/ViewDetails";
import { cn } from "@/lib/utils";

interface IPriceCard {
  type?: "normal" | "highlight";
  title: string;
  price?: string;
}

const PriceCard = ({ type = "normal", title, price }: IPriceCard) => {
  return (
    <div
      className={cn("p-2 rounded-lg bg-gray-100 col-span-4", {
        "bg-green-100 border border-green-500": type === "highlight",
      })}
    >
      <h3>{title}</h3>
      <p className="text-sm font-bold mt-3">
        {type === "highlight" ? (
          <span className="text-green-400">+4 proposals</span>
        ) : (
          <span>{price}</span>
        )}
      </p>
    </div>
  );
};

const PricingAnalysis = () => {
  return (
    <div className="insight-card">
      <div className="flex justify-between  ">
        <h2>Pricing Analysis</h2>
        <ViewDetails href="#" />
      </div>
      <div className="mt-3 grid grid-cols-12 gap-2">
        <PriceCard title="Competition Average Price" price={"298,99 USD"} />
        <PriceCard title="Company Average Price" price={"358,89 USD"} />
        <PriceCard type="highlight" title="AI Proposed Rates" />
      </div>
    </div>
  );
};

export default PricingAnalysis;
