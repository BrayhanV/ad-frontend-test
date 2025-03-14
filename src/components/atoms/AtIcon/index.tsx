import Image from "next/image"
import { AtIconProps } from "./types"

export const AtIcon = ({ src, alt, width, height, priority }: AtIconProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height ?? 24}
      className="p-0.5 hover:opacity-75 transition-opacity"
      priority={priority}
    />
  )
}