'use client';
import { Button } from '@/components/ui';
import { User } from '@/types/service/user';

import { ProfileCard } from '../profile-card';
import { ProfileDescription } from '../profile-description';
import { ProfileFollowsBadge } from '../profile-follows-badge';

interface Props {
  user: User;
}

export const ProfileInfo = ({ user }: Props) => {
  const handleFollowClick = () => {};

  return (
    <section className='px-4 py-8'>
      <ProfileCard user={user} />
      <ProfileFollowsBadge user={user} />
      {!user.isFollowing && <Button onClick={handleFollowClick}>팔로우 하기</Button>}
      {user.isFollowing && (
        <Button variant='tertiary' onClick={handleFollowClick}>
          팔로우 취소
        </Button>
      )}
      <ProfileDescription user={user} />
    </section>
  );
};
