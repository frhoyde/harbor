import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const ViewDetails = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1 text-blue-500 text-xs"
    >
      <span>View Details</span>
      <ChevronRightIcon className="w-4 h-4" />
    </Link>
  );
};

export default ViewDetails;
