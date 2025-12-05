import Image from 'next/image';

import { User } from '@/types/service/user';

interface Props {
  user: User;
}

export const ProfileCard = ({ user }: Props) => {
  const { profileImage, nickName, profileMessage } = user;
  return (
    <div className='flex-col-center'>
      <div className='relative mb-3 size-24 overflow-hidden rounded-full'>
        <Image alt='image' fill objectFit='cover' src={profileImage} />
      </div>
      <h2 className='text-text-xl-bold text-gray-900'>{nickName}</h2>
      <p className='text-text-sm-medium text-gray-600'>{profileMessage}</p>
    </div>
  );
};
