import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const GoButton = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1 text-blue-500 text-xs"
    >
      <span>Go to {name}</span>
      <ChevronRightIcon className="w-4 h-4" />
    </Link>
  );
};

export default GoButton;
