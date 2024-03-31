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
        width="60"
        height="72"
        viewBox="0 0 90 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M47.7358 54.1984C55.1725 48.7386 60 39.933 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 39.7129 4.61588 48.3478 11.7737 53.8305L29.5 72L47.7358 54.1984Z"
          fill={selectedStorage === storage.id ? "#FFB703" : "#6EA7FF"}
        />
        <circle cx="30" cy="30" r="27" fill="white" />
      </svg>
      <div className="absolute z-40 top-1/2 left-1/2 -translate-x-[25px] -translate-y-[25px] ">
        <Image
          src={storage.companyLogo ?? "/companyLogo-placeholder.ong"}
          alt={storage.title}
          width={260}
          height={260}
          className="w-16 h-auto"
        />
      </div>
    </div>
  );
}

export default React.memo(Pin);
