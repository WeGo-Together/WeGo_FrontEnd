import Link from 'next/link';

import { Icon } from '@/components/icon';

export const Header = () => {
  return (
    <header className={`sticky top-0 z-100 w-full bg-white`}>
      <nav className='flex-between px-4 py-2'>
        <Link href={'/'}>
          <Icon id='wego-logo' width={92} height={40} />
        </Link>
        <Link href={'/notification'} className='flex-center h-10 w-10'>
          <Icon id='bell-read' className='size-10 text-gray-700' />
        </Link>
      </nav>
    </header>
  );
};
