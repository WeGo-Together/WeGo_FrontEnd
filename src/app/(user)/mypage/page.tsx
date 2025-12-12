'use client';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { MyPageInfo, MyPageSetting } from '@/components/pages/user/mypage';
import { useGetUser } from '@/hooks/use-user';

const MyPage = () => {
  // const [userId, setUserId] = useState(0);
  const [userId, setUserId] = useState(0);
  // 여기서 user 정보를 확인해서 undefined이면 로그인페이지로 리다이렉트

  const { data: user } = useGetUser({ userId }, { enabled: !!userId });

  // userId가 MyPage의 파라미터로 전달되지 않기 때문에 직접 cookie로 꺼내와야함
  // 하지만 서버에서는 js-cookie 활용 불가능 => hydration Error 발생
  // 따라서 userId를 state롤 관리하고 useEffect 시 userId를 쿠키에 불러와야 해결가능
  useEffect(() => {
    const id = Cookies.get('userId');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserId(Number(id));
  }, []);

  if (!user) return null;
  return (
    <div className='flex min-h-[calc(100dvh-113px)] flex-col justify-between'>
      <MyPageInfo user={user} />
      <MyPageSetting user={user} />
    </div>
  );
};

export default MyPage;
