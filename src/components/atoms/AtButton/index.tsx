import { AtButtonClasses } from '@/components/atoms/AtButton/config'
import React from 'react'
import { AtButtonProps } from './types'

export const AtButton = ({ variant, color, disabled, children, onClick }: AtButtonProps) => {
  return ( 
    <button 
      className={`
        px-6 py-4 gap-2 rounded-lg font-bold tracking-[0.5px] 
        transition-all duration-300 ease-in-out disabled:opacity-75
        ${variant ? AtButtonClasses[variant] : "text-xs w-full md:w-fit md:h-[56px] md:text-sm"} 
        ${AtButtonClasses[color]}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}