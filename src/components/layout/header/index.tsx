'use client';
import Link from 'next/link';

import { Icon } from '@/components/icon';
import { cn } from '@/lib/utils';
import { useNotification } from '@/providers';

export const Header = () => {
  const { unReadCount, receivedNewNotification } = useNotification();

  return (
    <header className={`sticky top-0 z-100 w-full bg-white`}>
      <nav className='flex-between px-4 py-2'>
        <Link href={'/'}>
          <Icon id='wego-logo' width={92} height={40} />
        </Link>
        <div className='flex-center gap-2'>
          <Link href={'/notification'} className='flex-center relative h-10 w-10'>
            <Icon
              id='bell-read'
              className={cn(
                'size-10 text-gray-700 transition-colors duration-200',
                receivedNewNotification && 'animate-ring text-mint-500',
              )}
            />
            <span
              className={cn(
                'bg-mint-300 absolute top-1 right-1.75 aspect-square size-3.5 rounded-full',
                receivedNewNotification && 'animate-ping',
              )}
            />
            <span className='bg-mint-500 text-mono-white text-text-2xs-semibold flex-center absolute top-1 right-1.75 aspect-square size-3.5 rounded-full'>
              {unReadCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
