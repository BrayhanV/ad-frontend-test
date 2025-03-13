import { MouseEventHandler } from "react";
import { AtButtonColor, AtButtonVariant } from "./config";

export interface AtButtonProps {
  children: React.ReactNode,
  variant?: AtButtonVariant,
  color: AtButtonColor,
  disabled?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}