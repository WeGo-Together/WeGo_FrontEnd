import { ProfileImage } from '@/components/shared';
import { User } from '@/types/service/user';

interface Props {
  user: User;
}

export const ProfileCard = ({ user }: Props) => {
  const { profileImage, nickName, profileMessage } = user;
  return (
    <div className='flex-col-center mb-6'>
      <div className='mb-3'>
        <ProfileImage size='xl' src={profileImage} />
      </div>
      <h1 className='text-text-xl-bold text-gray-900'>{nickName}</h1>
      <p className='text-text-sm-medium text-gray-600'>{profileMessage}</p>
    </div>
  );
};
