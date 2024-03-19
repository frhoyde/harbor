"use client";

import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import SearchBar from "./SearchBar";

interface ITopNav {
  navigation: {
    href: string;
    name: string;
    icon: React.ReactNode;
  }[];
}

const TopNav = ({ navigation }: ITopNav) => {
  const pathname = usePathname();
  const routeName = navigation.find((nav) => nav.href === pathname)?.name;
  return (
    <div className="flex justify-between ">
      <h2 className="font-bold text-2xl ">{routeName}</h2>
      <div className="flex items-center space-x-4">
        <SearchBar />
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-secondary text-white p-1 w-8 h-8 border-none "
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default TopNav;
