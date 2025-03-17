"use client";
import Image from "next/image";
import { AtSelectProps } from "./at-select.types";

export const AtSelect = ({
  id,
  name,
  options,
  value,
  onChange,
}: AtSelectProps) => {
  return (
    <div className="relative w-full" data-testid="select-wrapper">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:min-w-[205px] bg-transparent border-none appearance-none p-4 focus:outline-none text-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
        <Image
          src={"/icons/select-arrow.svg"}
          alt="arrow"
          width={7.69}
          height={20.02}
          className="opacity-50"
        />
      </span>
    </div>
  );
};
