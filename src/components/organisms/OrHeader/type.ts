export enum OrHeaderLogoText {
  GAMER_SHOP = "GamerShop",
}

export interface OrHeaderIcons {
  icon: string;
  link: string;
}

export interface OrHeaderProps {
  icons: OrHeaderIcons[];
}