"use client";

import { useExploreStore } from "@/store";
import { IStorage } from "@/types";
import { MapPinIcon, XIcon } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IStorageInfo {
  storages: IStorage[];
}

const StorageInfo = ({ storages }: IStorageInfo) => {
  const selectedStorage = useExploreStore((state) => state.selectedStorage);
  const remove = useExploreStore((state) => state.removeSelectedStorage);

  if (!selectedStorage) return null;
  const storageInfo = storages.find(
    (storage) => storage.id === selectedStorage
  );
  if (!storageInfo) return null;
  return (
    <div className="flex flex-col basis-[35%]">
      <div className="flex items-center justify-between">
        <p className="text-harbor-gray-foreground font-bold">
          Last updated on {storageInfo.lastUpdated}
        </p>
        <button onClick={remove}>
          <XIcon />
        </button>
      </div>

      <div className="mt-4 ">
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={storageInfo.image}
            alt={storageInfo.title}
            width={400}
            height={400}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <p className="font-bold">{storageInfo.title}</p>
            <p className="flex items-center gap-2">
              {" "}
              <MapPinIcon /> {storageInfo.location}
            </p>
          </div>
          <div className="h-10 aspect-video">
            <Image
              src={storageInfo.companyLogo}
              width={200}
              height={200}
              alt={storageInfo.title}
              className="w-full h-full object-contain object-center "
            />
          </div>
        </div>
        <Table className="w-full mt-8">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Unit Size</TableHead>
              <TableHead>Special</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storageInfo.units.map((unit) => (
              <TableRow key={unit.dimensions}>
                <TableCell>{unit.dimensions}</TableCell>
                <TableCell>{unit.special ?? "N/A"}</TableCell>
                <TableCell>${unit.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StorageInfo;
