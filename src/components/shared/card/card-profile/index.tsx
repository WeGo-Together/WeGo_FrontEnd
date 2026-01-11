import { ProfileImage } from '@/components/shared/profile-image';

type CardProfileProps = {
  nickName: string;
  profileImage: string | null;
};

export const CardProfile = ({ nickName, profileImage }: CardProfileProps) => {
  return (
    <div className='mt-3 flex items-center gap-1.5'>
      <ProfileImage size='xs' src={profileImage} />
      <span className='text-text-xs-medium text-gray-900'>{nickName}</span>
    </div>
  );
};
