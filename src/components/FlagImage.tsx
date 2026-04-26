"use client";

import Image from "next/image";
import clsx from "clsx";

interface FlagImageProps {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function FlagImage({ src, alt = "", size = 20, className }: FlagImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={clsx("rounded-full object-cover", className)}
    />
  );
}
