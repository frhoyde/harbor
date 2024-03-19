"use client";
import { useExploreStore } from "@/store";
import { IStorage } from "@/types";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const StorageCard = ({ storage }: { storage: IStorage }) => {
  const setSelectedStorage = useExploreStore(
    (state) => state.setSelectedStorage
  );
  return (
    <div
      onClick={() => setSelectedStorage(storage.id)}
      className="shadow-md p-3 rounded-lg flex gap-8 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out bg-white"
    >
      <div className="rounded-lg overflow-hidden w-24 aspect-square">
        <Image
          src={storage.image}
          alt={storage.title}
          width={400}
          height={400}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex gap-3 flex-col">
        <Image
          src={storage.companyLogo}
          alt={storage.title}
          width={50}
          height={50}
        />
        <p className="text-md font-semibold">{storage.title}</p>
        <p className="text-harbor-gray-foreground flex items-center gap-2 text-xs">
          {" "}
          <MapPinIcon size={20} /> {storage.location}
        </p>
      </div>
    </div>
  );
};

export default StorageCard;
