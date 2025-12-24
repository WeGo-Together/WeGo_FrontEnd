'use client';
import { useLogout, useWithdraw } from '@/hooks/use-auth';
import { useUpdateMyNotification } from '@/hooks/use-user/use-user-notification';
import { User } from '@/types/service/user';

import { MyPageActionButton, MyPageToggleButton } from '../mypage-setting-button';

interface Props {
  user: User;
}

export const MyPageSetting = ({ user }: Props) => {
  const { mutate } = useUpdateMyNotification();
  const logout = useLogout();
  const withdraw = useWithdraw();

  return (
    <section className='bg-mono-white flex flex-col gap-3 px-3 py-6'>
      <MyPageToggleButton
        value={user.isNotificationEnabled}
        onClick={() => mutate({ isNotificationEnabled: !user.isNotificationEnabled })}
      >
        알림 받기
      </MyPageToggleButton>
      <MyPageActionButton onClick={logout}>로그아웃</MyPageActionButton>
      <MyPageActionButton onClick={withdraw}>회원탈퇴</MyPageActionButton>
    </section>
  );
};
