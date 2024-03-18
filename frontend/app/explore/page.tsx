import FacilityFilter from "@/components/pages/explore/FacilityFilter";
import StorageInfo from "@/components/pages/explore/StorageInfo";
import StorageList from "@/components/pages/explore/StorageList";
import StorageMap from "@/components/pages/explore/StorageMap";
import React from "react";

const storages = [
  {
    id: 1,
    image: "/storage/1.jpg",
    companyLogo: "/storage/company/1.png",
    title: "Public Storage of Lorem Ipsum 1",
    location: "1234 Lorem Ipsum Dr 1",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
  },
  {
    id: 2,
    image: "/storage/2.jpg",
    companyLogo: "/storage/company/2.png",
    title: "Public Storage of Lorem Ipsum 2",
    location: "1234 Lorem Ipsum Dr 2",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
  },
  {
    id: 3,
    image: "/storage/3.jpg",
    companyLogo: "/storage/company/3.png",
    title: "Public Storage of Lorem Ipsum 3",
    location: "1234 Lorem Ipsum Dr 3",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
  },
  {
    id: 4,
    image: "/storage/4.jpg",
    companyLogo: "/storage/company/4.png",
    title: "Public Storage of Lorem Ipsum 4",
    location: "1234 Lorem Ipsum Dr 4",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
  },
];

const page = () => {
  return (
    <div className="mb-12">
      <FacilityFilter />
      <div className="flex gap-8">
        <StorageList storages={storages} />
        <StorageInfo storages={storages} />

        <div className="flex-1">
          <StorageMap />
        </div>
      </div>
    </div>
  );
};

export default page;
