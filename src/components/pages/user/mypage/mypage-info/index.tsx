'use client';
import { Button, useModal } from '@/components/ui';
import { User } from '@/types/service/user';

import {
  ProfileCard,
  ProfileDescription,
  ProfileEditModal,
  ProfileFollowsBadge,
} from '../../profile';

interface Props {
  user: User;
}

export const MyPageInfo = ({ user }: Props) => {
  const { open } = useModal();

  const handleButtonClick = () => {
    open(<ProfileEditModal user={user} />);
  };

  return (
    <section className='px-4 py-8'>
      <ProfileCard user={user} />
      <ProfileFollowsBadge user={user} />
      <Button onClick={handleButtonClick}>프로필 수정하기</Button>
      <ProfileDescription user={user} />
    </section>
  );
};
