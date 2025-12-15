'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { Chat, FollowingList, FollowingNone, FollowingSearch } from '@/components/pages/message';
import { TabNavigation } from '@/components/shared';
import { useGetFollowers } from '@/hooks/use-follower/use-follower-get';

const SOCIAL_TABS = [
  { label: '팔로잉', value: 'following' },
  { label: '메세지', value: 'chat' },
];

export default function FollowingPage() {
  const [userId, setUserId] = useState(0);
  const { data: followers } = useGetFollowers({ userId }, { enabled: !!userId });

  useEffect(() => {
    const id = Cookies.get('userId');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserId(Number(id));
  }, []);
  console.log(followers);
  const params = useSearchParams();
  const tab = params.get('tab') || 'following';
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation basePath='/message' tabs={SOCIAL_TABS} />

      {tab === 'chat' && <Chat />}
      {tab === 'following' && (
        <>
          <FollowingSearch />

          {followers && followers.items.length > 0 ? (
            <FollowingList items={followers} />
          ) : (
            <div className='flex flex-1 items-center justify-center'>
              <FollowingNone />
            </div>
          )}
        </>
      )}
    </div>
  );
}
