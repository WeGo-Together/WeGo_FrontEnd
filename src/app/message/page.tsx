'use client';

import { useState } from 'react';

import { Chat, Following } from '@/components/pages/message';

export const TabNavigation = () => {
  const [tab, setTab] = useState<'following' | 'message'>('following');

  return (
    <div className='w-full'>
      <div className='flex'>
        <button
          className={`relative flex-1 border-b-2 py-4 text-center font-medium transition-colors hover:cursor-pointer ${
            tab === 'following'
              ? 'text-mint-600 border-b-mint-500'
              : 'border-b-gray-200 text-gray-500'
          }`}
          onClick={() => setTab('following')}
        >
          팔로잉
        </button>
        <button
          className={`relative flex-1 border-b-2 py-4 text-center font-medium transition-colors hover:cursor-pointer ${
            tab === 'message'
              ? 'text-mint-600 border-b-mint-500'
              : 'border-b-gray-200 text-gray-500'
          }`}
          onClick={() => setTab('message')}
        >
          메세지
        </button>
      </div>

      <div className='p-4'>
        {tab === 'following' && <Following />}
        {tab === 'message' && <Chat />}
      </div>
    </div>
  );
};

const MessagePage = () => {
  return (
    <div>
      <TabNavigation />
    </div>
  );
};

export default MessagePage;
