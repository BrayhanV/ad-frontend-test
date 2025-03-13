'use client';
import Image from 'next/image';
import SelectArrow from '../../../../public/select-arrow.svg';
import { AtSelectProps } from './types';

export const AtSelect = ({ id, name, options, value, onChange }: AtSelectProps) => {
  return (
    <div className="relative w-full">
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
      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
        <Image
          src={SelectArrow}
          alt=""
          width={7.69}
          height={20.02}
          className="opacity-50"
        />
      </div>
    </div>
  )
}