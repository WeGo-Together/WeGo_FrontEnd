'use client';
import { useState } from 'react';

import { User } from '@/types/service/user';

import { MyPageActionButton, MyPageToggleButton } from '../mypage-setting-button';

interface Props {
  user: User;
}

export const MyPageSetting = ({ user }: Props) => {
  console.log(user);
  // useState 로직은 추후 삭제 예정
  const [isOn, setIsOn] = useState(false);

  return (
    <section className='bg-mono-white flex flex-col gap-3 px-3 py-6'>
      <MyPageToggleButton value={isOn} onClick={() => setIsOn((prev) => !prev)}>
        알림 받기
      </MyPageToggleButton>
      <MyPageActionButton onClick={() => console.log('로그아웃')}>로그아웃</MyPageActionButton>
      <MyPageActionButton onClick={() => console.log('회원탈퇴')}>회원탈퇴</MyPageActionButton>
    </section>
  );
};
