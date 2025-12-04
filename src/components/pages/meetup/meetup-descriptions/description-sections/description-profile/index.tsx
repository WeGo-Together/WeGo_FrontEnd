import Image from 'next/image';
import Link from 'next/link';

interface Props {
  profileImage: string;
  name: string;
  bio: string;
}

export const DescriptionProfile = ({ profileImage, name, bio }: Props) => {
  return (
    <div className='w-full'>
      <Link href='#' className='flex gap-3'>
        <Image
          width={40}
          className='h-10 w-10 shrink-0 rounded-full'
          alt='프로필 사진'
          height={40}
          objectFit='cover'
          src={profileImage}
        />

        <div className='*:line-clamp-1'>
          <p className='text-text-md-semibold text-gray-800'>{name}</p>
          <p className='text-text-xs-regular text-gray-600'>{bio}</p>
        </div>
      </Link>
    </div>
  );
};
