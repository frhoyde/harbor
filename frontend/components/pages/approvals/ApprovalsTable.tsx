"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ApprovalDetail from "./ApprovalDetail";
import moment from "moment";
import TypePill from "./TypePill";
import StatusPill from "./StatusPill";
import RateDifference from "./RateDifference";

interface IApprovalsTableProps {
  approvals: {
    name: string;
    description: string;
    submittedBy: string;
    size: string;
    type: string[];
    requestID: string;
    currentRate: number;
    proposedRate: number;
    status: string;
    createdAt: string;
  }[];
}

const ApprovalsTable = ({ approvals }: IApprovalsTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedApprovalID, setSelectedApprovalID] = useState<string | null>(
    null
  );
  return (
    <div>
      <Table className="w-full mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]"> Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Current Rate</TableHead>
            <TableHead>Proposed Rate</TableHead>
            <TableHead>Difference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted by</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {approvals.map((approval) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                setOpen(true);
                setSelectedApprovalID(approval.requestID);
              }}
              key={approval.requestID}
            >
              <TableCell>{approval.name}</TableCell>
              <TableCell>{approval.size}</TableCell>
              <TableCell>
                <TypePill types={approval.type} />
              </TableCell>
              <TableCell>{`$${approval.currentRate}`}</TableCell>
              <TableCell>{`$${approval.proposedRate}`}</TableCell>
              <TableCell>
                {approval && (
                  <RateDifference
                    current={approval.currentRate}
                    proposed={approval.proposedRate}
                  />
                )}
              </TableCell>
              <TableCell>
                <StatusPill status={approval.status} />
              </TableCell>
              <TableCell>{approval.submittedBy}</TableCell>
              <TableCell>
                {moment(approval.createdAt).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ApprovalDetail
        open={open}
        setOpen={setOpen}
        selectedApprovalID={selectedApprovalID}
        approvals={approvals}
      />
    </div>
  );
};

export default ApprovalsTable;
