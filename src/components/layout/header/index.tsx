import Link from 'next/link';

import { Icon } from '@/components/icon';

export const Header = () => {
  return (
    <header className='sticky top-0 z-100 h-14 w-full bg-white px-4 py-2'>
      <nav className='flex-between'>
        <Link href={'/'}>
          <Icon id='wego-logo' width={92} height={40} />
        </Link>
        <Link href={'/notification'} className='flex-center h-10 w-10'>
          <Icon id='bell-read' width={24} height={24} />
        </Link>
      </nav>
    </header>
  );
};
