
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
  [AtButtonVariant.DESKTOP]: "h-[56px] text-sm",
  [AtButtonColor.PRIMARY]: "bg-white text-primary border border-stroke-primary border-solid",
  [AtButtonColor.SECONDARY]: "bg-secondary text-white"
}
