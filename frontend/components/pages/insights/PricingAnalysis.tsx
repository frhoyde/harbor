"use client";

import ViewDetails from "@/components/shared/ViewDetails";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface IPriceCard {
  type?: "normal" | "highlight";
  title: string;
  price?: string;
}

const PriceCard = ({ type = "normal", title, price }: IPriceCard) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/";
  return (
    <div
      className={cn("p-2 rounded-lg bg-gray-100 col-span-4", {
        "bg-green-100 border border-green-500": type === "highlight",
      })}
    >
      <h3>{title}</h3>
      <p className={cn("text-sm font-bold mt-3", { "text-xs": isDashboard })}>
        {type === "highlight" ? (
          <span className="text-green-400 ">+4 proposals</span>
        ) : (
          <span>{price}</span>
        )}
      </p>
    </div>
  );
};

const PricingAnalysis = () => {
  const pathname = usePathname();
  const isDashboard = pathname === "/";
  return (
    <div className="card">
      <div className="flex justify-between  ">
        {isDashboard ? <h3>Pricing Analysis</h3> : <h2>Pricing Analysis</h2>}

        {!isDashboard ? <ViewDetails href="#" /> : null}
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
