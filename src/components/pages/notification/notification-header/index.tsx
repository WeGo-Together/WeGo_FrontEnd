'use client';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';

export const NotificationHeader = () => {
  const router = useRouter();

  const handleHistoryBackClick = () => {
    console.log('뒤로가라');
    router.back();
  };

  return (
    <nav className='bg-mono-white flex-center sticky top-14 h-12 border-b-1 border-gray-200'>
      <Icon
        id='chevron-left-2'
        className='absolute left-5 size-6 cursor-pointer rounded-md text-gray-500 transition-colors duration-300 hover:bg-gray-100 active:bg-gray-100'
        aria-label='뒤로 가기'
        role='button'
        onClick={handleHistoryBackClick}
      />
      <h2 className='text-text-md-bold text-gray-800'>알림</h2>
    </nav>
  );
};
