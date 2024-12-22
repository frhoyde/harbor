"use client";
import { useExploreStore } from "@/store";
import { IStorage } from "@/types";
import Image from "next/image";
import * as React from "react";

function Pin({ storage }: { storage: IStorage }) {
  const selectedStorage = useExploreStore((state) => state.selectedStorage);
  return (
    <div className="relative cursor-pointer">
      <svg
        width="90"
        height="108"
        viewBox="0 0 90 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 "
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M71.6037 81.2976C82.7588 73.108 90 59.8995 90 45C90 20.1472 69.8528 0 45 0C20.1472 0 0 20.1472 0 45C0 59.5694 6.92382 72.5217 17.6606 80.7458L44.25 108L71.6037 81.2976Z"
          fill={selectedStorage === storage.id ? "#FFB703" : "#6EA7FF"}
        />
        <circle cx="45" cy="45" r="40.5" fill="white" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center -translate-y-2">
        <Image
          src={storage.companyLogo ?? "/companyLogo-placeholder.png"}
          alt={storage.title}
          width={260}
          height={260}
          className="w-12 h-12 object-contain rounded-full"
        />
      </div>
    </div>
  );
}

export default React.memo(Pin);
