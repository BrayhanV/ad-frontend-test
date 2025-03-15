export enum AtButtonVariant {
  DESKTOP = "desktop",
  MOBILE = "mobile",
}

export enum AtButtonColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export const AtButtonClasses = {
  [AtButtonVariant.MOBILE]: "text-xs",
  [AtButtonVariant.DESKTOP]: "h-[56px] w-full text-sm",
  [AtButtonColor.PRIMARY]: `
    bg-white text-primary border border-stroke-primary border-solid 
    hover:bg-surface-secondary disabled:hover:bg-white
  `,
  [AtButtonColor.SECONDARY]: `
    bg-secondary text-white hover:bg-primary 
    disabled:hover:bg-secondary
`,
};
