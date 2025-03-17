'use client'
import Image from "next/image";
import { AtIconProps } from "./at-icon.types";
import { useCallback } from "react";

export const AtIcon = ({
  src,
  alt,
  width = 24,
  height = 24,
  priority,
  onClick,
}: AtIconProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`p-0.5 hover:opacity-75 transition-opacity ${onClick ? "cursor-pointer" : ""}`}
      priority={priority}
      onClick={handleClick}
    />
  );
};
