import Image from "next/image";
import React from "react";

const Avatar = ({ src, name }: { src: string; name: string }) => {
  return (
    <Image
      src={src}
      alt={name}
      width={100}
      height={100}
      className="w-8 h-8 rounded-full"
    />
  );
};

export default Avatar;
