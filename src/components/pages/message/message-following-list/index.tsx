'use client';

import { FollowingCard } from '../message-followingCard';

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
      {items.map((item, index) => (
        <FollowingCard
          key={index}
          name={item.name}
          profileImage={item.profileImage}
          profileMessage={item.profileMessage}
          type='following'
        />
      ))}
    </div>
  );
};
