'use client';

import { FollowingCard } from '../message-following-card';

interface FollowingItem {
  name: string;
  profileImage: string;
  profileMessage: string;
}

interface FollowingListProps {
  items: FollowingItem[];
}

export const FollowingList = ({ items }: FollowingListProps) => {
  return (
    <div>
      {items.map((item) => (
        <FollowingCard
          key={item.id}
          name={item.name}
          profileImage={item.profileImage}
          profileMessage={item.profileMessage}
          type='following'
        />
      ))}
    </div>
  );
};
