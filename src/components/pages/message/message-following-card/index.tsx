import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { ProfileImage } from '@/components/shared';
import { useCreateDMChat } from '@/hooks/use-chat/use-chat-dm';

interface FollowingCardProps {
  userId: number;
  nickname: string;
  profileImage: string;
  profileMessage: string;
  onMessageClick?: () => void;
}

export const FollowingCard = ({
  userId,
  nickname,
  profileImage,
  profileMessage,
}: FollowingCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useCreateDMChat(userId);

  const handleClick = () => {
    router.push(`/profile/${userId}`);
  };

  // 메세지 보내기 버튼 클릭 시 (DM)
  const handleDMClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const data = await mutateAsync({ targetUserId: userId });
      router.push(`/message/chat/${data.chatRoomId}`);
    } catch (error) {
      console.error('DM 생성 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-testid='following-card'
      className='flex cursor-pointer items-center gap-3 bg-white p-5 hover:bg-gray-50'
      onClick={handleClick}
    >
      <ProfileImage size='md' src={profileImage} />

      <div className='flex flex-1 flex-col'>
        <span className='text-text-md-bold text-gray-800'>{nickname}</span>
        <span className='text-text-sm-medium line-clamp-1 text-gray-500'>{profileMessage}</span>
      </div>

      <button
        className='text-text-xs-semibold cursor-pointer rounded-lg bg-gray-100 px-5 py-1 text-gray-800 transition hover:opacity-80'
        onClick={(e) => {
          e.stopPropagation();
          handleDMClick();
        }}
      >
        메세지
      </button>
    </div>
  );
};
