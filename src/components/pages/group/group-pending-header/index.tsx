'use client';

import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';

export const GroupPendingHeader = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className='sticky top-14 z-100 flex h-12 items-center justify-center border-b border-gray-200 bg-white'>
      <button
        className='absolute left-5 flex items-center justify-center'
        aria-label='뒤로 가기'
        onClick={handleBackClick}
      >
        <Icon id='chevron-left-2' className='text-gray-500' />
      </button>
      <h2 className='text-text-md-bold text-gray-800'>참여 신청</h2>
    </div>
  );
};
