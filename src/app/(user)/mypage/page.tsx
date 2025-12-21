'use client';
import { MyPageInfo, MyPageSetting } from '@/components/pages/user/mypage';
import { useGetMe } from '@/hooks/use-user/use-user-get-me';

const MyPage = () => {
  const { data: user } = useGetMe();

  if (!user) return null;
  return (
    <div className='flex min-h-[calc(100dvh-113px)] flex-col justify-between'>
      <MyPageInfo user={user} />
      <MyPageSetting user={user} />
    </div>
  );
};

export default MyPage;
