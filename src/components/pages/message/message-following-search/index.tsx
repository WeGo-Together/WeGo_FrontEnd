'use client';

import { Icon } from '@/components/icon';
import { useModal } from '@/components/ui';

import { FollowingModal } from '../message-following-modal';

export const FollowingSearch = ({ userId }: { userId: number }) => {
  const { open } = useModal();
  return (
    <div
      className='bg-mono-white mb-2 flex items-center gap-5 px-5 py-4 transition-all hover:cursor-pointer hover:opacity-80'
      onClick={() => {
        open(<FollowingModal userId={userId} />);
        console.log('hi');
      }}
    >
      <div className='rounded-full border-2 border-dashed border-gray-400 bg-gray-100 p-2'>
        <Icon id='plus' className='size-6 text-gray-700' />
      </div>

      <span className='text-text-md-bold text-gray-800'>팔로우 추가</span>
    </div>
  );
};
