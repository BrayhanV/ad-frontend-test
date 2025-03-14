import Image from 'next/image';
import Link from 'next/link';
import { OrHeaderLogoText, OrHeaderProps } from './type';

export const OrHeader = ({ icons }: OrHeaderProps) => {
  return (
    <header className='flex justify-between items-center px-6 md:px-32 py-5 bg-surface-secondary'>
      <Link href="/" className='text-area-normal tracking-wide font-bold text-secondary'>{OrHeaderLogoText.GAMER_SHOP}</Link>
      <nav>
        <ul className='flex space-x-4'>
          {icons.map((icon, index) => (
            <li key={index}>
              <Link href={icon.link}>
                <Image
                  src={icon.icon}
                  alt="Logo"
                  width={20}
                  height={20.02}
                  className="hover:opacity-75 transition-opacity"
                  priority
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}