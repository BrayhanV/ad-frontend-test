import { AtIcon } from "@/components/atoms/at-icon/at-icon";
import { MlLinkProps } from "./ml-link.types";
import Link from "next/link";

export const MlLink = ({ iconProps, href, label }: MlLinkProps) => {
  return (
    <Link href={href} className={`flex items-center gap-2`}>
      {iconProps && <AtIcon {...iconProps} />}
      {!!label && <span className="text-sm tracking-normal">{label}</span>}
    </Link>
  );
};
