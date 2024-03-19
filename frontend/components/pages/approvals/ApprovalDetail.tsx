"use client";
import moment from "moment";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import StatusPill from "./StatusPill";
import TypePill from "./TypePill";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import RateDifference from "./RateDifference";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IApprovalDetailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
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
  selectedApprovalID: string | null;
}

const ApprovalDetail = ({
  open,
  setOpen,
  approvals,
  selectedApprovalID,
}: IApprovalDetailProps) => {
  const session = useSession();
  const user = session.data?.user;
  const approval = approvals.find((a) => a.requestID === selectedApprovalID);
  if (!selectedApprovalID) return null;
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="min-w-[40%]">
          <ScrollArea className="h-full w-full pr-4 ">
            <div className="flex flex-col gap-4 mb-8">
              {approval && <StatusPill status={approval?.status} />}
              <div className="flex items-center gap-2 text-harbor-gray-foreground">
                <span> {moment(approval?.createdAt).format("DD/MM/YYYY")}</span>
                <span>•</span>
                <span>{moment(approval?.createdAt).format("hh:mm:ss a")}</span>
              </div>
              <h2 className="text-xl font-bold">{approval?.name}</h2>
              <p>{approval?.description}</p>
              <ul className="mt-8 flex flex-col gap-4 ">
                <li className="flex justify-between items-center gap-8">
                  <span className="text-harbor-gray-foreground">
                    Submitted by
                  </span>
                  <span>{approval?.submittedBy}</span>
                </li>
                <li className="flex justify-between items-center gap-8">
                  <span className="text-harbor-gray-foreground">Size</span>
                  <span>{approval?.size}</span>
                </li>
                <li className="flex justify-between items-center gap-8">
                  <span className="text-harbor-gray-foreground">Type</span>
                  {approval && <TypePill types={approval?.type} />}
                </li>
                <li className="flex justify-between items-center gap-8">
                  <span className="text-harbor-gray-foreground">
                    {" "}
                    Request ID
                  </span>
                  <span>{approval?.requestID}</span>
                </li>
                <li className="flex justify-between items-center gap-8">
                  <span className="text-harbor-gray-foreground">
                    Current Rate & Effective Date
                  </span>
                  <span>{`$${approval?.currentRate}`}</span>
                </li>
                <li className="flex justify-between items-center gap-8">
                  <span className="text-harbor-gray-foreground">
                    Proposed Rate
                  </span>
                  <span>{`$${approval?.proposedRate}`}</span>
                </li>
                <li className="flex justify-between items-center gap-8">
                  <span className="text-harbor-gray-foreground">
                    Difference
                  </span>
                  <span>
                    {approval && (
                      <RateDifference
                        current={approval?.currentRate}
                        proposed={approval?.proposedRate}
                      />
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <Separator />
            <div className="mt-8 flex gap-2 peer">
              {user && (
                <Avatar
                  src={user?.image ?? "/avatar-placeholder.png"}
                  name={user?.name ?? "John Doe"}
                />
              )}
              <textarea
                className="flex-1 resize-none px-2 pb-2 min-h-[100px] focus:outline-none "
                placeholder="Add a comment..."
              />
            </div>
            <Separator className="peer-has-[:focus]:bg-black" />
            <div className="flex justify-between my-8">
              <p>Would you like to approve the request?</p>
              <div className="flex gap-2 items-center">
                <Button variant="secondary">Approve</Button>
                <Button variant="destructive">Reject</Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ApprovalDetail;
