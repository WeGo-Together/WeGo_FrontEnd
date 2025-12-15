import { useRouter } from 'next/navigation';

import { ImageWithFallback } from '@/components/ui';
import { cn } from '@/lib/utils';

interface FollowingCardProps {
  userId: number;
  nickname: string;
  profileImage: string;
  profileMessage: string;
  type: 'following' | 'message';
  count?: number;
  onMessageClick?: () => void;
}

export const FollowingCard = ({
  userId,
  nickname,
  profileImage,
  profileMessage,
  type,
  count = 0,
  onMessageClick,
}: FollowingCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/profile/${userId}`);
  };
  return (
    <div
      data-testid='following-card'
      className='flex cursor-pointer items-center gap-3 bg-white p-5'
      onClick={handleClick}
    >
      {/* <div className='size-12 rounded-full'>
        <ImageWithFallback className='object-cover' alt='프로필 이미지' fill src={profileImage} />
      </div> */}
      <div className='relative size-12 overflow-hidden rounded-full'>
        <ImageWithFallback
          className='object-cover'
          alt='프로필 이미지'
          fill
          loading='eager'
          src={profileImage}
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <span className='text-text-md-bold text-gray-800'>{nickname}</span>
        <span
          className={cn(
            'text-text-sm-medium line-clamp-1',
            type === 'following' && 'text-gray-500',
            type === 'message' && 'text-gray-700',
          )}
        >
          {profileMessage}
        </span>
      </div>
      {/* 탭이 following 인지 message인지에 따라 달라지는 요소. */}
      {type === 'following' ? (
        <button
          className='text-text-xs-semibold cursor-pointer rounded-lg bg-gray-100 px-5 py-1 text-gray-800 transition hover:opacity-80'
          onClick={(e) => {
            e.stopPropagation();
            onMessageClick?.();
          }}
        >
          메세지
        </button>
      ) : (
        <span
          className={`bg-mint-500 text-mono-white text-text-xs-bold rounded-full px-2 py-0.5 ${count === 0 ? 'opacity-0' : ''} `}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};
