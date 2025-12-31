'use client';

import { useRouter } from 'next/navigation';

import { use, useEffect } from 'react';

import { ProfileInfo } from '@/components/pages/user/profile';
import { useGetUser } from '@/hooks/use-user';
import { useUserGetMe } from '@/hooks/use-user/use-user-get-me';

interface Props {
  params: Promise<{ userId: string }>;
}

const ProfilePage = ({ params }: Props) => {
  const router = useRouter();

  const { userId: id } = use(params);
  const userId = Number(id);

  const { data: user } = useGetUser({ userId });
  const { data: me } = useUserGetMe();

  useEffect(() => {
    if (user?.userId === me?.userId) {
      router.replace('/mypage');
    }
  }, [me?.userId, router, user?.userId]);

  if (!user) return null;

  return <ProfileInfo user={user} />;
};

export default ProfilePage;
