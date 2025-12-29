'use client';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';
import { useUpdateNotificationReadAll } from '@/hooks/use-notification';
import { cn } from '@/lib/utils';
import { useNotification } from '@/providers';

export const NotificationHeader = () => {
  const router = useRouter();

  const { unReadCount } = useNotification();
  const { mutateAsync } = useUpdateNotificationReadAll();

  const handleHistoryBackClick = () => {
    router.back();
  };

  const handleReadAllClick = () => {
    if (unReadCount === 0) return;
    try {
      mutateAsync();
    } catch {
      alert('요청 처리에 실패했습니다.');
    }
  };

  return (
    <nav className='bg-mono-white flex-center sticky top-14 z-10 h-12 border-b-1 border-gray-200'>
      <button
        className='absolute left-5 size-6 cursor-pointer rounded-md transition-colors duration-300 hover:bg-gray-100 active:bg-gray-100'
        aria-label='뒤로 가기'
        onClick={handleHistoryBackClick}
      >
        <Icon id='chevron-left-2' className='text-gray-500' />
      </button>
      <h2 className='text-text-md-bold text-gray-800'>알림</h2>
      <button
        className={cn(
          'text-text-sm-semibold absolute right-5',
          unReadCount > 0 && 'text-mint-500',
          unReadCount === 0 && 'text-gray-500',
        )}
        disabled={unReadCount === 0}
        onClick={handleReadAllClick}
      >
        모두 읽음
      </button>
    </nav>
  );
};
