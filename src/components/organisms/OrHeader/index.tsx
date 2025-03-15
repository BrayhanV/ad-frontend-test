import Link from "next/link";
import { OrHeaderLogoText, OrHeaderProps } from "./type";
import MlLink from "@/components/molecules/MlLink";

export const OrHeader = ({ icons }: OrHeaderProps) => {
  return (
    <header className="flex justify-between items-center px-6 md:px-32 py-5 bg-surface-secondary">
      <Link
        href="/"
        className="text-area-normal tracking-wide font-bold text-secondary"
      >
        {OrHeaderLogoText.GAMER_SHOP}
      </Link>
      <nav>
        <ul className="flex space-x-4">
          {icons.map((icon, index) => (
            <li key={index}>
              <MlLink
                iconProps={{ src: icon.icon, alt: icon.icon }}
                href={icon.link}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
