'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { ChatHeader, ChatInput, MyChat, OtherChat } from '@/components/pages/chat';
import { UserList } from '@/components/pages/chat/chat-user-list';
import { useGetChatMessages } from '@/hooks/use-chat';
import { useReadMessages } from '@/hooks/use-chat/use-chat-read';
import { useChatSocket } from '@/hooks/use-chat/use-chat-socket';
import { ChatMessage } from '@/types/service/chat';

// 임시 사용자 데이터
const users = [
  {
    id: 0,
    nickName: '멍선생',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 1,
    nickName: '짱구',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 2,
    nickName: '맹구',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 3,
    nickName: '철수',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ.',
  },
  {
    id: 4,
    nickName: '철수',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 5,
    nickName: '철수',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 6,
    nickName: '철수',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 7,
    nickName: '철수',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 8,
    nickName: '철수',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
  {
    id: 9,
    nickName: '철수',
    profileImage: DEFAULT_PROFILE_IMAGE,
    profileMessage: '한줄 소개 내용입니다.',
  },
];

interface IProps {
  accessToken: string | null;
  roomId: number;
  userId: number;
}

const ChatRoomPage = ({ accessToken, roomId, userId }: IProps) => {
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const { data: previousMessages } = useGetChatMessages(roomId);
  const { mutate: readMessages } = useReadMessages(roomId, userId);
  const {
    messages: newMessages,
    sendMessage,
    isConnected,
  } = useChatSocket({
    roomId,
    userId,
    accessToken,
    onMessage: (message) => {
      console.log('새 메시지:', message);
      setChatMessages((prev) => [...prev, message]);
    },
  });

  useEffect(() => {
    if (!isConnected) return;

    readMessages();
  }, [isConnected, readMessages, newMessages]);

  useEffect(() => {
    if (!previousMessages) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChatMessages([...previousMessages.messages].reverse());
  }, [previousMessages]);

  console.log(newMessages);

  const handleSubmit = (text: string) => {
    sendMessage(text);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // 마지막(가장 최근) 메세지 ref로 스크롤 이동
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 다음 프레임에서 스크롤 실행
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }, [chatMessages.length]);

  return (
    <div className='relative h-[calc(100vh-112px)] overflow-hidden'>
      {/* 채팅 화면 */}
      <div
        className={`absolute inset-0 flex flex-col transition-transform duration-300 ease-in-out ${
          isUserListOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <ChatHeader onUserListClick={() => setIsUserListOpen(true)} />

        <div
          ref={containerRef}
          className='scrollbar-thin ml-4 flex flex-1 flex-col gap-4 overflow-y-auto py-4'
        >
          {!isConnected && <div>연결 중...</div>}
          {chatMessages.map((item) =>
            item.senderId === userId ? (
              <MyChat key={item.messageId} item={item} />
            ) : (
              <OtherChat key={item.messageId} item={item} />
            ),
          )}
        </div>

        <ChatInput onSubmit={handleSubmit} />
      </div>

      <div
        className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          isUserListOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <UserList users={users} onClose={() => setIsUserListOpen(false)} />
      </div>
    </div>
  );
};

export default ChatRoomPage;
