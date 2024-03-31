import { IStorage } from "@/types";

export const storages: IStorage[] = [
  {
    id: 1,
    image: "/storage/1.jpg",
    companyLogo: "/storage/company/1.png",
    title: "Public Storage of Lorem Ipsum 1",
    address: "1234 Lorem Ipsum Dr 1",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
    location: {
      lat: 36.327003,
      lng: -86.588808,
    },
  },
  {
    id: 2,
    image: "/storage/2.jpg",
    companyLogo: "/storage/company/2.png",
    title: "Public Storage of Lorem Ipsum 2",
    address: "1234 Lorem Ipsum Dr 2",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
    location: {
      lat: 36.322535,
      lng: -86.585395,
    },
  },
  {
    id: 3,
    image: "/storage/3.jpg",
    companyLogo: "/storage/company/3.png",
    title: "Public Storage of Lorem Ipsum 3",
    address: "1234 Lorem Ipsum Dr 3",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
    location: {
      lat: 36.3134692,
      lng: -86.589705,
    },
  },
  {
    id: 4,
    image: "/storage/4.jpg",
    companyLogo: "/storage/company/4.png",
    title: "Public Storage of Lorem Ipsum 4",
    address: "1234 Lorem Ipsum Dr 4",
    lastUpdated: "04/02/2024",
    units: [
      { dimensions: "10x10 GI", price: 100, special: "1 month free" },
      { dimensions: "10x20 H&C", price: 250, special: "" },
      { dimensions: "10x30 H&C", price: 350, special: "" },
      { dimensions: "20x20 GI", price: 400, special: "2 months free" },
    ],
    location: {
      lat: 36.330056,
      lng: -86.561944,
    },
  },
];
