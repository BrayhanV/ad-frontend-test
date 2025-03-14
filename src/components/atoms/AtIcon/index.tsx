import Image from "next/image"
import { AtIconProps } from "./types"

export const AtIcon = ({ src, alt, width, height, priority, onClick }: AtIconProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 24}
      height={height ?? 24}
      className={`p-0.5 hover:opacity-75 transition-opacity ${onClick ? "cursor-pointer" : ""}`}
      priority={priority}
      onClick={onClick}
    />
  )
}