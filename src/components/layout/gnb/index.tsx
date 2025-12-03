import Link from 'next/link';

import Icon from '@/components/shared/icon';

export const GNB = () => {
  return (
    <nav className='sticky bottom-0 z-100 h-14 bg-white py-2'>
      <ul className='flex w-full justify-evenly gap-4'>
        {NAV_MENU.map(({ path, svgId }) => (
          <li key={path}>
            <Link href={path} className='flex-center h-10 w-10'>
              <Icon id={svgId} className='text-gray-600' />
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
    svgId: 'calendar',
  },
  {
    path: '/post-meetup',
    svgId: 'plus-circle',
  },
  {
    path: '/message',
    svgId: 'message',
  },
  {
    path: '/mypage',
    svgId: 'user',
  },
] as const;
