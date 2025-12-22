'use client';

import { MyPageActionButton } from '@/components/pages/user/mypage/mypage-setting-button';
import { useLogout, useRefresh, useWithdraw } from '@/hooks/use-auth';

const LoginTempActions = () => {
  const logout = useLogout();
  const withdraw = useWithdraw();
  const refresh = useRefresh();

  return (
    <div className='flex-center'>
      <MyPageActionButton onClick={logout}>로그아웃</MyPageActionButton>
      <MyPageActionButton onClick={withdraw}>회원탈퇴</MyPageActionButton>
      <MyPageActionButton onClick={refresh}>refresh</MyPageActionButton>
    </div>
  );
};

export default LoginTempActions;
