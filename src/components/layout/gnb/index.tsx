'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/icon';
import { useAuth } from '@/providers';

export const GNB = () => {
  const pathname = usePathname();

  const { isAuthenticated } = useAuth();

  const highLightPath = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className='sticky bottom-0 z-100 h-14 border-t-1 border-gray-200 bg-white py-2'>
      <ul className='flex w-full justify-evenly gap-4'>
        {NAV_MENU.map(({ path, svgId }) => (
          <li key={path}>
            <Link href={path} prefetch={isAuthenticated} className='flex-center h-10 w-10'>
              <Icon
                id={svgId}
                className={highLightPath(path) ? 'text-mint-500' : 'text-gray-500'}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const NAV_MENU = [
  {
    path: '/',
    svgId: 'home',
  },
  {
    path: '/schedule',
    svgId: 'calendar-1',
  },
  {
    path: '/create-group',
    svgId: 'plus-circle',
  },
  {
    path: '/message',
    svgId: 'message',
  },
  {
    path: '/mypage',
    svgId: 'user-1',
  },
] as const;
