import Image from 'next/image';
import SelectArrow from '../../../public/select-arrow.svg';

interface Option {
  id: string;
  value: string;
  label: string;
}

interface AtSelectProps {
  id: string;
  name: string;
  options: Option[];
}

export const AtSelect = ({ id, name, options }: AtSelectProps) => {
  return (
    <div className="relative w-full">
      <select 
        id={id}
        name={name}
        className="w-full md:min-w-[205px] bg-transparent border-none appearance-none p-4 focus:outline-none text-primary"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
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