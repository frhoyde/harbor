import ApprovalsTable from "@/components/pages/approvals/ApprovalsTable";

const approvals = [
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
  {
    name: "Rate Adjustment Request for 5’x5’ Climate",
    description:
      "Proposing a rate adjustment for 5’x5’ Climate-controlled units to remain competitive in the market. A rate increase of $5.20 is suggested effective from 2023-04-15, considering recent industry trends.",
    submittedBy: "Sigma Strategies",
    size: "5’x5’",
    type: ["climate - controlled", "small"],
    requestID: "#3",
    currentRate: 120,
    proposedRate: 125.2,

    status: "pending",
    createdAt: "2021-08-30T12:00:00Z",
  },
  {
    name: "Rate Amendment Proposal for 10’x15’ H&C",
    description:
      "Analyze recent market fluctuations, proposing a rate amendment for 10’x15’ H&C units. Recommend a rate increase of $12.80 to be effective from 2023-07-01 to maintain profitability and competitiveness.",
    submittedBy: "Insight Solutions",
    size: "10’x15’",
    type: ["climate - controlled"],
    requestID: "#4",
    currentRate: 280,
    proposedRate: 292.8,

    status: "rejected",
    createdAt: "2020-05-12T12:00:00Z",
  },
  {
    name: "Rate Modification Request for 5’x10’ non-climate",
    description:
      "In response to recent market dynamics, proposing a rate modification for 5’x10’ non-climate units. Suggest a rate increase of $7.00 effective from 2023-05-15 to optimize revenue streams and enhance competitiveness.",
    submittedBy: "Trend Analytics Inc.",
    size: "5’x10’",
    type: ["small", "large"],
    requestID: "#5",
    currentRate: 150,
    proposedRate: 157.0,

    status: "approved",
    createdAt: "2018-12-20T12:00:00Z",
  },
  {
    name: "Rate Adjustment Proposal for 5’x5’ non-climate",
    description:
      "Analyzing recent market trends, proposing a rate adjustment for 5’x5’ non-climate units. Recommend a rate increase of $4.00 to be effective from 2023-04-01 to ensure competitiveness and maximize revenue.",
    submittedBy: "Strategic Pricing Solutions",
    size: "5’x5’",
    type: ["non-climate"],
    requestID: "#6",
    currentRate: 100,
    proposedRate: 104.0,

    status: "pending",
    createdAt: "2017-07-05T12:00:00Z",
  },
  {
    name: "Rate Amendment Request for 10’x20’ H&C",
    description:
      "Proposing a rate amendment for 10’x20’ H&C units considering recent market dynamics. Suggest a rate increase of $15.30 effective from 2023-08-01 to ensure competitiveness and maximize revenue.",
    submittedBy: "PricePro Analytics",
    size: "10’x20’",
    type: ["climate - controlled"],
    requestID: "#7",
    currentRate: 350,
    proposedRate: 365.3,

    status: "pending",
    createdAt: "2016-02-28T12:00:00Z",
  },
  {
    name: "Rate Modification Proposal for 5’x10’ H&C",
    description:
      "Considering recent market trends, proposing a rate modification for 5’x10’ H&C units. Suggest a rate increase of $7.80 effective from 2023-06-01 to maintain competitiveness and optimize revenue streams.",
    submittedBy: "Pricing Dynamics Inc.",
    size: "5’x10’",
    type: ["climate - controlled"],
    requestID: "#8",
    currentRate: 170,
    proposedRate: 177.8,

    status: "rejected",
    createdAt: "2014-09-10T12:00:00Z",
  },
  {
    name: "Rate Adjustment Request for 10’x15’ non-climate",
    description:
      "Analyzing market trends, proposing a rate adjustment for 10’x15’ non-climate units. Suggest a rate increase of $11.50 effective from 2023-07-15 to ensure competitiveness and optimize revenue.",
    submittedBy: "Price Insights Group",
    size: "10’x15’",
    type: ["non-climate"],
    requestID: "#9",
    currentRate: 250,
    proposedRate: 261.5,
    status: "approved",
    createdAt: "2014-05-10T12:50:40Z",
  },
];

const page = () => {
  return (
    <div>
      <ApprovalsTable approvals={approvals} />
    </div>
  );
};

export default page;
