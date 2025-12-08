'use client';

import { use } from 'react';

import { ProfileInfo } from '@/components/pages/profile';
import { useGetUser } from '@/hooks/use-user';

interface Props {
  params: Promise<{ userId: string }>;
}

const ProfilePage = ({ params }: Props) => {
  const { userId: id } = use(params);
  const userId = Number(id);

  const { data: user } = useGetUser({ userId });

  if (!user) return null;

  return (
    <div className='bg-gray-50'>
      <ProfileInfo user={user} />
    </div>
  );
};

export default ProfilePage;
