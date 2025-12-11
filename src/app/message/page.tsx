'use client';

import { useSearchParams } from 'next/navigation';

import { Chat, FollowingList, FollowingSearch } from '@/components/pages/message';
import { TabNavigation } from '@/components/shared';
import { useGetFollowers } from '@/hooks/use-follower/use-follower-get';

const SOCIAL_TABS = [
  { label: '팔로잉', value: 'following' },
  { label: '메세지', value: 'chat' },
];

export default function FollowingPage() {
  const { data: followers } = useGetFollowers();

  const params = useSearchParams();
  const tab = params.get('tab') || 'following';
  if (!followers) return null;
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation basePath='/message' tabs={SOCIAL_TABS} />

      {tab === 'chat' && <Chat />}
      {tab === 'following' && (
        <>
          <FollowingSearch />
          <FollowingList items={followers} />
        </>
      )}
    </div>
  );
}
