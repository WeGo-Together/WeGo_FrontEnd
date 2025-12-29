'use client';

import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';

interface ChatHeaderProps {
  onUserListClick: () => void;
}

export const ChatHeader = ({ onUserListClick }: ChatHeaderProps) => {
  const router = useRouter();
  return (
    <div className='bg-mono-white flex w-full items-center justify-between border-b border-gray-200 px-5 py-3'>
      <Icon
        id='chevron-left-2'
        className='w-6 cursor-pointer text-gray-500'
        onClick={() => router.back()}
      />
      <span className='text-text-md-bold text-gray-800'>분당 보드게임 동아리</span>
      <Icon id='users-1' className='w-6 cursor-pointer text-gray-500' onClick={onUserListClick} />
    </div>
  );
};
