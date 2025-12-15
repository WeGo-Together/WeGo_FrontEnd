'use client';

import { Follower } from '@/types/service/follow';

import { FollowingCard } from '../message-following-card';

interface FollowingListProps {
  items: Follower[];
}

export const FollowingList = ({ items }: FollowingListProps) => {
  return (
    <div>
      {items.map((item) => (
        <FollowingCard
          key={item.userId}
          nickname={item.nickname}
          profileImage={item.profileImage}
          profileMessage={item.profileMessage}
          type='following'
          userId={item.userId}
        />
      ))}
    </div>
  );
};
