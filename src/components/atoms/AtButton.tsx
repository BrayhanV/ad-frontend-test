import { AtButtonClasses, AtButtonColor, AtButtonVariant } from '@/config/AtButton.config'
import React from 'react'


interface AtButtonProps {
  children: React.ReactNode,
  variant: AtButtonVariant,
  color: AtButtonColor
}

export const AtButton = ({ variant, color, children }: AtButtonProps) => {
  return ( 
    <button className={`px-6 py-4 gap-2 rounded-lg font-bold tracking-[0.5px] ${AtButtonClasses[variant]} ${AtButtonClasses[color]}`}>
      {children}
    </button>
  )
}