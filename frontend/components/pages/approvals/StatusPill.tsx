import { cn } from "@/lib/utils";
import React from "react";

const StatusPill = ({ status }: { status: string }) => {
  return (
    <p
      className={cn("rounded-lg p-2 max-w-fit mb-4 text-white ", {
        " bg-green-500": status === "approved",
        " bg-yellow-500": status === "pending",
        "bg-red-500": status === "rejected",
      })}
    >
      {status}
    </p>
  );
};

export default StatusPill;
