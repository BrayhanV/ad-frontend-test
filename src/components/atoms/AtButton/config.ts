
export enum AtButtonVariant {
  DESKTOP = 'desktop',
  MOBILE = 'mobile'
}

export enum AtButtonColor {
  PRIMARY = 'bg-primary',
  SECONDARY = 'bg-secondary',
}

export const AtButtonClasses = { 
  [AtButtonVariant.MOBILE]: "text-xs",
  [AtButtonVariant.DESKTOP]: "h-[56px] w-full text-sm",
  [AtButtonColor.PRIMARY]: "bg-white text-primary border border-stroke-primary border-solid hover:bg-surface-secondary",
  [AtButtonColor.SECONDARY]: "bg-secondary text-white hover:bg-primary"
}
