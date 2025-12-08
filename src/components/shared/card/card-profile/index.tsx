import Image from 'next/image';

type CardProfileProps = {
  nickName: string;
  profileImage?: string | null;
  size?: number;
};

const DEFAULT_SIZE = 16;

export const CardProfile = ({ nickName, profileImage, size = DEFAULT_SIZE }: CardProfileProps) => {
  return (
    <div className='mt-3 flex items-center gap-1.5'>
      {profileImage ? (
        <Image
          width={size}
          className='rounded-full object-cover'
          alt={nickName}
          height={size}
          src={profileImage}
        />
      ) : (
        <div className='rounded-full bg-gray-600' style={{ width: size, height: size }} />
      )}
      <span className='text-text-xs-medium text-gray-900'>{nickName}</span>
    </div>
  );
};
