'use client';
import { ProfileInfo, ProfileSetting } from '@/components/pages/profile';
import { useGetUser } from '@/hooks/use-user';

const MyPage = () => {
  const userId = 1;
  // 여기서 user 정보를 확인해서 undefined이면 로그인페이지로 리다이렉트

  const { data: user } = useGetUser({ userId });
  if (!user) return null;
  return (
    <div className='flex min-h-[calc(100dvh-113px)] flex-col justify-between bg-gray-50'>
      <ProfileInfo user={user} />
      <ProfileSetting user={user} />
    </div>
  );
};

export default MyPage;
