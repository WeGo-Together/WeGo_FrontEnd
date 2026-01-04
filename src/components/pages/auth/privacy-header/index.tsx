'use client';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';

export const PrivacyHeader = () => {
  const router = useRouter();

  const handleHistoryBackClick = () => {
    router.back();
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
      <h2 className='text-text-md-bold text-gray-800'>개인정보 처리 및 서비스 이용 약관</h2>
    </nav>
  );
};
