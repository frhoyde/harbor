import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

const TypePill = ({ types }: { types: string[] }) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {types.map((type) => (
        <Badge
          variant="outline"
          key={type}
          className={cn("text-xs text-nowrap", {
            "border-blue-500": type === "small",
            "border-green-500": type === "large",
            "border-yellow-500": type === "medium",
            "border-red-500": type === "climate - controlled",
            "border-emerald-500": type === "non-climate",
          })}
        >
          {type}
        </Badge>
      ))}
    </div>
  );
};

export default TypePill;
