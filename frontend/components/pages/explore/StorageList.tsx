import React from "react";
import StorageCard from "./StorageCard";
import type { IStorage } from "@/types";

const StorageList = ({ storages }: { storages: IStorage[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {storages.map((storage) => (
        <StorageCard key={storage.id} storage={storage} />
      ))}
    </div>
  );
};

export default StorageList;
