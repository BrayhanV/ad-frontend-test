import React, { MouseEventHandler, useCallback, useMemo } from "react";
import { AtButtonProps } from "./at-button.types";
import { AtButtonClasses, AtButtonColor } from "./at-button.classes";

export const AtButton = ({
  variant,
  color,
  disabled,
  fit,
  children,
  onClick,
}: AtButtonProps) => {
  const buttonColor = useMemo(
    () => (color ? color : AtButtonColor.PRIMARY),
    [color],
  );

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (onClick) {
        onClick(e);
      }
    },
    [onClick],
  );

  return (
    <button
      className={`
        px-6 py-4 gap-2 rounded-lg font-bold tracking-[0.5px] 
        transition-all duration-300 ease-in-out disabled:opacity-75
        ${variant ? AtButtonClasses[variant] : "text-xs md:h-[56px] md:text-sm"} 
        ${AtButtonClasses[buttonColor]}
        ${fit ? "w-fit" : "w-full"}
      `}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
