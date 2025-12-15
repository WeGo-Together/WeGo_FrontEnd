'use client';
import { useUpdateMyNotification } from '@/hooks/use-user/use-user-notification';
import { User } from '@/types/service/user';

import { MyPageActionButton, MyPageToggleButton } from '../mypage-setting-button';

interface Props {
  user: User;
}

export const MyPageSetting = ({ user }: Props) => {
  const { mutate } = useUpdateMyNotification();

  return (
    <section className='bg-mono-white flex flex-col gap-3 px-3 py-6'>
      <MyPageToggleButton
        value={user.isNotificationEnabled}
        onClick={() => mutate({ isNotificationEnabled: !user.isNotificationEnabled })}
      >
        알림 받기
      </MyPageToggleButton>
      <MyPageActionButton onClick={() => console.log('로그아웃')}>로그아웃</MyPageActionButton>
      <MyPageActionButton onClick={() => console.log('회원탈퇴')}>회원탈퇴</MyPageActionButton>
    </section>
  );
};
