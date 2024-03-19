"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface INavLink {
  href: string;
  name: string;
  icon: React.ReactNode;
}

const NavLink = ({ href, name, icon }: INavLink) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        { "bg-secondary text-white": isActive },
        "flex items-center space-x-2 mb-4 p-3 rounded-md text-sm"
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
};

export default NavLink;
