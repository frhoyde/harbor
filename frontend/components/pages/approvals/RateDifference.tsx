import { cn } from "@/lib/utils";
import React from "react";

const RateDifference = ({
  current,
  proposed,
}: {
  current: number;
  proposed: number;
}) => {
  const difference = proposed - current;
  const differencePercentage = (Math.abs(difference) / current) * 100;
  return (
    <div
      className={cn({
        "text-green-500": difference > 0,
        "text-red-500": difference < 0,
      })}
    >
      <p>{`${difference > 0 ? "+" : "-"}$${Math.abs(
        difference
      ).toLocaleString()}`}</p>
      <p>{`(${differencePercentage.toLocaleString()}%)`}</p>
    </div>
  );
};

export default RateDifference;
