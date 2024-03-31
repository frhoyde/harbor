import FacilityFilter from "@/components/pages/explore/FacilityFilter";
import StorageInfo from "@/components/pages/explore/StorageInfo";
import StorageList from "@/components/pages/explore/StorageList";
import StorageMap from "@/components/pages/explore/StorageMap";
import { storages } from "@/lib/data";
import React from "react";

const page = () => {
  return (
    <div className="mb-12">
      <FacilityFilter />
      <div className="flex gap-8">
        <StorageList storages={storages} />
        <StorageInfo storages={storages} />

        <div className="flex-1">
          <StorageMap storages={storages} />
        </div>
      </div>
    </div>
  );
};

export default page;
