'use client';

import Link from 'next/link';

import { Icon } from '@/components/icon';
import { CowBell } from '@/components/layout/header/cow-bell';
import { HeaderLogin } from '@/components/layout/header/header-login';
import { useAuthStore } from '@/stores';

export const Header = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className={`sticky top-0 z-100 w-full bg-white`}>
      <nav className='flex-between px-4 py-2'>
        <Link href={'/'}>
          <Icon id='wego-logo' width={92} height={40} />
        </Link>
        <div className='flex-center gap-2'>{isAuthenticated ? <CowBell /> : <HeaderLogin />}</div>
      </nav>
    </header>
  );
};
