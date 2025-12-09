'use client';

import { useSearchParams } from 'next/navigation';

import { Chat, FollowingList, FollowingSearch } from '@/components/pages/message';
import { TabNavigation } from '@/components/shared';

const SOCIAL_TABS = [
  { label: '팔로잉', value: 'following' },
  { label: '메세지', value: 'chat' },
];

const FOLLOWING_LIST = [
  {
    id: 1,
    name: '신짱구',
    profileImage:
      'https://images.unsplash.com/photo-1714635218254-740bad86a0e8?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    id: 2,
    name: '신짱구',
    profileImage:
      'https://images.unsplash.com/photo-1714635218254-740bad86a0e8?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    id: 3,
    name: '신짱구',
    profileImage:
      'https://images.unsplash.com/photo-1714635218254-740bad86a0e8?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    profileMessage: '안녕하세요 신짱구입니다',
  },
];

export default function FollowingPage() {
  const params = useSearchParams();
  const tab = params.get('tab') || 'following';
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation basePath='/message' tabs={SOCIAL_TABS} />

      {tab === 'chat' && <Chat />}
      {tab === 'following' && (
        <>
          <FollowingSearch />
          <FollowingList items={FOLLOWING_LIST} />
        </>
      )}
    </div>
  );
}
