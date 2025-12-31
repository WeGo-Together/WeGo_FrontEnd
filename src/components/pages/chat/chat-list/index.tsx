'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { useGetChatList } from '@/hooks/use-chat/use-chat-list';
import { cn } from '@/lib/utils';

interface IProps {
  userId: number;
}

export const ChatList = ({ userId }: IProps) => {
  const router = useRouter();

  const handleClick = (chatId: number) => {
    router.push(`/chat/${chatId}`);
  };
  const { data: chatList } = useGetChatList({ userId });
  console.log(chatList);

  return (
    <ul className='flex flex-col'>
      {chatList?.chatRooms?.map((chat) => (
        <li
          key={chat.chatRoomId}
          className='flex cursor-pointer items-center gap-3 bg-white p-5 transition hover:bg-gray-50'
          onClick={() => handleClick(chat.chatRoomId)}
        >
          {/* 프로필 이미지 - 이미지 수정 필요💥💥*/}
          <div className='relative size-12 overflow-hidden rounded-full'>
            <Image
              className='object-cover'
              alt='프로필 이미지'
              fill
              loading='eager'
              src={DEFAULT_PROFILE_IMAGE}
            />
          </div>

          {/* 텍스트 영역 */}
          <div className='flex flex-1 flex-col'>
            <span className='text-text-md-bold text-gray-800'>{chat.chatRoomName}</span>
            <span className={cn('text-text-sm-medium line-clamp-1 text-gray-700')}>
              {chat.lastMessage ? chat.lastMessage.content : '아직 대화가 없습니다.'}
            </span>
          </div>

          {/* 안 읽은 메시지 수 */}
          <span
            className={cn(
              'text-mono-white text-text-xs-bold rounded-full bg-red-500 px-2 py-0.5',
              chat.unreadCount === 0 && 'opacity-0',
            )}
          >
            {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
          </span>
        </li>
      ))}
    </ul>
  );
};
