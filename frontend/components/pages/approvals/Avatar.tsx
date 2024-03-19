import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Avatar = ({
  src,
  name,
  size = "sm",
}: {
  src: string;
  name: string;
  size?: string;
}) => {
  return (
    <Image
      src={src}
      alt={name}
      width={100}
      height={100}
      className={cn(" rounded-full", {
        "w-12 h-12": size === "lg",
        "w-8 h-8": size === "sm",
      })}
    />
  );
};

export default Avatar;
