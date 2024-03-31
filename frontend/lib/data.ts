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

export const approvalsOverview = [
  {
    name: "Rate Change Request for 5’x10’ H&C",
    description:
      "Considering the recent rate changes on 2023-01-01 (+5.00) and 2023-03-15 (-3.00), it’s recommended to implement a rate increase of $7.50 on 2023-05-01. This adjustment aligns with market trends and ensures competitiveness while maximizing revenue for Public Storage. Additionally, competitors A and C have lower prices, presenting an opportunity to capture a higher share of the market.",
    submittedBy: "Harbor AI",
    size: "5’x10’",
    type: ["climate - controlled"],
    requestID: "#1",
    currentRate: 164,
    proposedRate: 170.0,

    status: "approved",
    createdAt: "2015-03-25T12:00:00Z",
  },
  {
    name: "Rate Change Request for 10’x10’ non-climate",
    description:
      "Based on recent market analysis, proposing a rate increase of $8.50 for 10’x10’ non-climate storage units effective from 2023-06-01. This adjustment aims to optimize revenue streams and maintain competitive pricing against market rivals.",
    submittedBy: "Peak Analytica",
    size: "10’x10’",
    type: ["non-climate", "large", "small"],
    requestID: "#2",
    currentRate: 280,
    proposedRate: 208.5,

    status: "pending",
    createdAt: "2019-10-18T12:00:00Z",
  },
];
