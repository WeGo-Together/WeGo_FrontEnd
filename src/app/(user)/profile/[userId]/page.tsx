'use client';

import { use } from 'react';

import { ProfileInfo } from '@/components/pages/user/profile';
import { useGetUser } from '@/hooks/use-user';

interface Props {
  params: Promise<{ userId: string }>;
}

const ProfilePage = ({ params }: Props) => {
  const { userId: id } = use(params);
  const userId = Number(id);

  const { data: user } = useGetUser({ userId });

  return <ProfileInfo user={user} />;
};

export default ProfilePage;
