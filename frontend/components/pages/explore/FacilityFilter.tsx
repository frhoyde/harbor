"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";

const FacilityFilter = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All", value: "all", count: 9 },
    { label: "Offers Available", value: "offers", count: 3 },
    { label: "Best Rated", value: "rated", count: 5 },
  ];

  return (
    <div className="flex items-center space-x-3 mb-8">
      {filters.map((filter, i) => (
        <Fragment key={filter.value}>
          <button
            className={cn("flex items-center gap-2 text-xs", {
              " text-secondary ": activeFilter === filter.value,
            })}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
            <span
              className={cn(
                " px-2 rounded-lg text-harbor-gray-foreground bg-harbor-gray",
                { "bg-secondary text-white": activeFilter === filter.value }
              )}
            >
              {filter.count}
            </span>
          </button>
          {i < filters.length - 1 && (
            <Separator orientation="vertical" className="h-8" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default FacilityFilter;
