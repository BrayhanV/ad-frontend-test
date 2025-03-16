import { AtSeparatorProps } from "./at-separator.type";

export const AtSeparator = ({ color, height, className }: AtSeparatorProps) => {
  return <hr className={`w-full h-[${height}px] bg-[${color}] ${className}`} />;
};
