import Image from 'next/image';
import CartIcon from '../../../../public/cart.svg';
import Link from 'next/link';

export const OrHeader = () => {
  return (
    <header className='flex justify-between items-center px-6 md:px-32 py-5 bg-surface-secondary'>
      <Link href="/" className='text-area-normal tracking-wide font-bold text-secondary'>GamerShop</Link>
      <nav>
        <ul className='flex space-x-4'>
          <li>
            <Image
              src={CartIcon}
              alt="Logo"
              width={20}
              height={20.02}
              className="hover:opacity-75 transition-opacity"
              priority
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}