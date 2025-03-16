import { AtIcon } from "@/components/atoms/at-icon/at-icon";
import { MlLinkProps } from "./types";
import Link from "next/link";

export default function MlLink({ iconProps, href, label }: MlLinkProps) {
  return (
    <Link href={href} className={`flex items-center gap-2`}>
      {iconProps && <AtIcon {...iconProps} />}
      <span className="text-sm tracking-normal">{label}</span>
    </Link>
  );
}
