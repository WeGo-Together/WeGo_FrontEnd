'use client';

import { Button } from '@/components/ui';
import { useFollowUser, useUnfollowUser } from '@/hooks/use-user';
import { User } from '@/types/service/user';

import { ProfileCard } from '../profile-card';
import { ProfileDescription } from '../profile-description';
import { ProfileFollowsBadge } from '../profile-follows-badge';

interface Props {
  user: User;
}

export const ProfileInfo = ({ user }: Props) => {
  const { mutate: followUser } = useFollowUser(user.userId);
  const { mutate: unfollowUser } = useUnfollowUser(user.userId);

  const handleFollowClick = () => {
    followUser({ followNickname: user.nickName });
  };

  const handleUnfollowClick = () => {
    unfollowUser({ unFollowNickname: user.nickName });
  };

  return (
    <section className='px-4 py-8'>
      <ProfileCard user={user} />
      <ProfileFollowsBadge user={user} />
      {!user.isFollow && <Button onClick={handleFollowClick}>팔로우 하기</Button>}
      {user.isFollow && (
        <Button variant='tertiary' onClick={handleUnfollowClick}>
          팔로우 취소
        </Button>
      )}
      <ProfileDescription user={user} />
    </section>
  );
};
