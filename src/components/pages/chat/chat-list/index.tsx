'use client';
import { useRouter } from 'next/navigation';

import { useMemo } from 'react';

import { ProfileImage } from '@/components/shared';
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
    router.push(`/message/chat/${chatId}`);
  };
  const { data: chatList } = useGetChatList({ userId });

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
        chatList?.chatRooms
          ?.filter((chatRoom) => chatRoom.lastMessage !== null)
          .map((chat) => (
            <li
              key={chat.chatRoomId}
              className='flex cursor-pointer items-center gap-3 bg-white p-5 transition hover:bg-gray-50'
              onClick={() => handleClick(chat.chatRoomId)}
            >
              {/* 프로필 이미지 */}
              <ProfileImage fetchPriority='high' size='md' src={chat.thumbnail} />

              {/* 텍스트 영역 */}
              <div className='flex flex-1 flex-col'>
                <span className='text-text-md-bold text-gray-800'>{chat.chatRoomName}</span>
                <span
                  className={cn(
                    'text-text-sm-medium line-clamp-1 overflow-hidden break-all text-gray-700',
                  )}
                >
                  {chat.lastMessage.content}
                </span>
              </div>

              {/* 안 읽은 메시지 수 */}
              <span
                className={cn(
                  'text-mono-white text-text-xs-bold bg-mint-500 flex items-center justify-center rounded-full',
                  chat.unreadCount === 0 && 'opacity-0',
                  chat.unreadCount < 10 && 'size-6',
                  chat.unreadCount >= 10 && 'h-6 w-7',
                )}
              >
                {chat.unreadCount > 99 ? '99' : chat.unreadCount}
              </span>
            </li>
          ))
      )}
    </ul>
  );
};
