'use client';

import { GetFollowerResponse } from '@/types/service/follow';

import { FollowingCard } from '../message-following-card';

interface FollowingListProps {
  items: GetFollowerResponse;
}

export const FollowingList = ({ items }: FollowingListProps) => {
  return (
    <div>
      {items.items.map((item) => (
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
