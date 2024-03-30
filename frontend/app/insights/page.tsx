import FinancialMetrics from "@/components/pages/insights/FinancialMetrics";
import MarketComparison from "@/components/pages/insights/MarketComparison";
import PricingAnalysis from "@/components/pages/insights/PricingAnalysis";
import TrendsAndForecast from "@/components/pages/insights/TrendsAndForecast";
import UtilizationRate from "@/components/pages/insights/UtilizationRate";

const page = () => {
  return (
    <div className="flex gap-4">
      <div className="basis-[63%] flex flex-col gap-4">
        <TrendsAndForecast />
        <UtilizationRate />
      </div>
      <div className="basis-[37%] flex flex-col gap-4">
        <PricingAnalysis />
        <MarketComparison />
        <FinancialMetrics />
      </div>
    </div>
  );
};

export default page;
