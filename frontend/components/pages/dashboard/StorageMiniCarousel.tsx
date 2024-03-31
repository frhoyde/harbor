"use client";
import { storages } from "@/lib/data";
import { useExploreStore } from "@/store";
import { IStorage } from "@/types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Card = ({ storage }: { storage: IStorage | undefined }) => {
  if (!storage) {
    return null;
  }
  return (
    <>
      <div className="p-3 shadow rounded-lg flex gap-2">
        <Image
          src={storage.image}
          alt={storage.title}
          width={250}
          height={250}
          className="w-16 aspect-square object-cover object-center rounded-lg overflow-hidden basis-[30%] "
        />

        <div className="flex-1 flex flex-col gap-2">
          <Image
            src={storage.companyLogo}
            alt={storage.title}
            width={40}
            height={24}
            className=" object-cover object-center"
          />

          <p className="font-bold text-xs ">{storage.title}</p>
          <p className="text-xs text-muted-foreground">{storage.address}</p>
        </div>
      </div>
    </>
  );
};

const StorageMiniCarousel = () => {
  const setSelectedStorage = useExploreStore(
    (state) => state.setSelectedStorage
  );
  const selectedStorageId = useExploreStore((state) => state.selectedStorage);
  const selectedStorage = storages.find(
    (storage) => storage.id === selectedStorageId
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % storages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + storages.length) % storages.length);
  };

  useEffect(() => {
    setSelectedStorage(storages[currentIndex].id);
  }, [currentIndex, setSelectedStorage]);
  return (
    <div className="flex gap-3 items-center justify-between mt-3">
      <div className="flex-1">
        <Card storage={selectedStorage} />
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleNext}
          className="bg-white shadow w-6 h-6 rounded-full grid place-content-center"
        >
          <ChevronUpIcon className="w-3 h-3 text-gray-800" />
        </button>
        <button
          onClick={handlePrevious}
          className="bg-white shadow w-6 h-6 rounded-full grid place-content-center"
        >
          <ChevronDownIcon className="w-3 h-3 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default StorageMiniCarousel;
