import { cn } from "@/lib/utils";
import React from "react";

const TypePill = ({ types }: { types: string[] }) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {types.map((type) => (
        <p
          key={type}
          className={cn("max-w-fit p-2 rounded-lg border", {
            "border-blue-500": type === "small",
            "border-green-500": type === "large",
            "border-yellow-500": type === "medium",
            "border-red-500": type === "climate - controlled",
            "border-emerald-500": type === "non-climate",
          })}
        >
          {type}
        </p>
      ))}
    </div>
  );
};

export default TypePill;
