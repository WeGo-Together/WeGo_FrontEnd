'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useMemo } from 'react';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { useChatListSocket, useGetChatList } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';

import { ChattingNone } from '../chat-none';

interface IProps {
  userId: number;
  accessToken: string | null;
}

export const ChatList = ({ userId, accessToken }: IProps) => {
  const router = useRouter();
  const handleClick = (chatId: number) => {
    router.push(`/chat/${chatId}`);
  };
  const { data: chatList } = useGetChatList({ userId });

  console.log(chatList);

  // 채팅방 ID 목록 추출
  const chatRoomIds = useMemo(() => {
    return chatList?.chatRooms?.map((chat) => chat.chatRoomId) || [];
  }, [chatList]);

  // 모든 채팅방 구독하여 실시간 갱신
  useChatListSocket({
    userId,
    accessToken,
    chatRoomIds,
  });

  return (
    <ul className='flex flex-col'>
      {chatList?.chatRooms.length === 0 ? (
        <ChattingNone />
      ) : (
        chatList?.chatRooms?.map((chat) => (
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
        ))
      )}
    </ul>
  );
};
