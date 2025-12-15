'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/icon';

type HeaderProps = {
  heightClass?: string;
  searchBar?: React.ReactNode;
};

export const Header = ({ heightClass = 'h-14', searchBar }: HeaderProps) => {
  const pathname = usePathname();
  const isRootPage = pathname === '/';

  return (
    <header className={`sticky top-0 z-100 ${heightClass} w-full bg-white`}>
      <nav className='flex-between px-4 py-2'>
        <Link href={'/'}>
          <Icon id='wego-logo' width={92} height={40} />
        </Link>
        <Link href={'/notification'} className='flex-center h-10 w-10'>
          <Icon id='bell-read' className='size-10 text-gray-700' />
        </Link>
      </nav>
      {isRootPage && searchBar && <div className='px-4 pb-2'>{searchBar}</div>}
    </header>
  );
};
