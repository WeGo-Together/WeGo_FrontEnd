'use client';
import { useLayoutEffect, useRef, useState } from 'react';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { ChatHeader, ChatInput, MyChat, OtherChat } from '@/components/pages/chat';
import { UserList } from '@/components/pages/chat/chat-user-list';

// 임시 데이터
let data = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  text: '안녕하세요 멍선생입니다 \n 계속 입력하면 어떻게 되나 봅시다',
  time: '오후 11:24',
  profileImage: DEFAULT_PROFILE_IMAGE,
  nickName: '흰둥이',
  userId: index % 3 === 0 ? 0 : 1,
}));
data = [
  ...data,
  {
    id: 31,
    text: '어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마어마하게 긴 메세지',
    time: '오후 11:25',
    profileImage: DEFAULT_PROFILE_IMAGE,
    nickName: '흰둥이',
    userId: 0,
  },
];
const myId = 0;

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

const ChatRoomPage = () => {
  const [messages, setMessages] = useState(data);
  const [isUserListOpen, setIsUserListOpen] = useState(false);

  const handleSubmit = (text: string) => {
    const newMessage = {
      id: Date.now(),
      text,
      profileImage: DEFAULT_PROFILE_IMAGE,
      nickName: '흰둥이',
      time: '지금',
      userId: myId,
    };

    setMessages((prev) => [...prev, newMessage]);
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
  }, [messages]);

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
          {messages.map((item) =>
            item.userId === myId ? (
              <MyChat key={item.id} item={item} />
            ) : (
              <OtherChat key={item.id} item={item} />
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
