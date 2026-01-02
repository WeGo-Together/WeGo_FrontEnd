'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { useGetChatList } from '@/hooks/use-chat/use-chat-list';
import { cn } from '@/lib/utils';

import { ChattingNone } from '../chat-none';

interface IProps {
  userId: number;
}

export const ChatList = ({ userId }: IProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleClick = (chatId: number) => {
    router.push(`/message/chat/${chatId}`);
  };
  const { data: chatList } = useGetChatList({ userId });

  console.log(chatList);

  // 현재 방식은 tanstack query를 이용해서 단지 목록 조회
  // but, 소켓 통신을 하고 있는 상황이므로 목록 역시 소켓을 열어서 페이지에 머물러 있을 때도 실시간으로 확인 가능하도록
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['chatList', userId] });
  }, [chatList, userId]);

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
              <span
                className={cn(
                  'text-text-sm-medium line-clamp-1 overflow-hidden break-all text-gray-700',
                )}
              >
                {chat.lastMessage ? chat.lastMessage.content : '아직 대화가 없습니다.'}
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
