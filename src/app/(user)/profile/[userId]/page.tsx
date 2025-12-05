'use client';

import { use } from 'react';

import { ProfileCard } from '@/components/pages/profile';
import { useFollowUser, useGetUser, useUnfollowUser } from '@/hooks/use-user';

interface Props {
  params: Promise<{ userId: string }>;
}

const ProfilePage = ({ params }: Props) => {
  const { userId: id } = use(params);
  const userId = Number(id);

  const { data: user } = useGetUser({ userId });
  const { mutate: followUser } = useFollowUser({ followeeId: userId });

  const { mutate: unfollowUser } = useUnfollowUser({ followeeId: userId });

  const handleFollowClick = () => {
    followUser();
  };

  const handleUnfollowClick = () => {
    unfollowUser();
  };

  console.log(user);

  return (
    <div>
      {user && <ProfileCard user={user} />}
      {/* <p>{data?.id}</p>
      <p>{data?.nickName}</p>
      <p>{data?.mbti}</p> */}

      <button onClick={handleFollowClick}>팔로우</button>
      <button onClick={handleUnfollowClick}>팔로우 취소</button>
    </div>
  );
};

export default ProfilePage;
