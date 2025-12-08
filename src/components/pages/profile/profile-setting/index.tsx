'use client';
import { useState } from 'react';

import { User } from '@/types/service/user';

import { ProfileActionButton, ProfileToggleButton } from './profile-setting-button';

interface Props {
  user: User;
}

export const ProfileSetting = ({ user }: Props) => {
  console.log(user);
  // useState 로직은 추후 삭제 예정
  const [isOn, setIsOn] = useState(false);

  return (
    <section className='bg-mono-white flex flex-col gap-3 px-3 py-6'>
      <ProfileToggleButton value={isOn} onClick={() => setIsOn((prev) => !prev)}>
        알림 받기
      </ProfileToggleButton>
      <ProfileActionButton onClick={() => console.log('로그아웃')}>로그아웃</ProfileActionButton>
      <ProfileActionButton onClick={() => console.log('회원탈퇴')}>회원탈퇴</ProfileActionButton>
    </section>
  );
};
