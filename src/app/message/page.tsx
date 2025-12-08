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
    profileImage: '',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    id: 2,
    name: '신짱구',
    profileImage: '',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    id: 3,
    name: '신짱구',
    profileImage: '',
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
