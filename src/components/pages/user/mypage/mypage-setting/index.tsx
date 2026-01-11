'use client';
import { useLogout, useWithdraw } from '@/hooks/use-auth';
import { User } from '@/types/service/user';

import { MyPageActionButton } from './mypage-setting-button';

interface Props {
  user: User;
}

export const MyPageSetting = ({ user: _ }: Props) => {
  const logout = useLogout();
  const withdraw = useWithdraw();

  return (
    <section className='bg-mono-white flex flex-col gap-3 px-3 py-6'>
      <MyPageActionButton onClick={logout}>로그아웃</MyPageActionButton>
      <MyPageActionButton onClick={withdraw}>회원탈퇴</MyPageActionButton>
    </section>
  );
};
