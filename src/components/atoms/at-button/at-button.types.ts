import { MouseEventHandler } from "react";
import { AtButtonColor, AtButtonVariant } from "./at-button.classes";

export interface AtButtonProps {
  children: React.ReactNode;
  variant?: AtButtonVariant;
  color?: AtButtonColor;
  disabled?: boolean;
  fit?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
