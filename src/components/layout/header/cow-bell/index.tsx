import Link from 'next/link';

import { Icon } from '@/components/icon';
import { cn } from '@/lib/utils';
import { useNotification } from '@/providers';

export const CowBell = () => {
  const { unReadCount, receivedNewNotification } = useNotification();

  return (
    <Link href={'/notification'} className='flex-center relative h-10 w-10'>
      <Icon
        id='bell-read'
        className={cn(
          'size-10 text-gray-700 transition-colors duration-200',
          receivedNewNotification && 'animate-ring text-mint-500',
        )}
      />
      {unReadCount > 0 && (
        <>
          <span
            className={cn(
              'bg-mint-300 absolute top-1 right-1.75 aspect-square size-3.5 rounded-full',
              receivedNewNotification && 'animate-ping',
            )}
          />
          <span className='bg-mint-500 text-mono-white text-text-2xs-semibold flex-center absolute top-1 right-1.75 aspect-square size-3.5 rounded-full'>
            {unReadCount}
          </span>
        </>
      )}
    </Link>
  );
};
