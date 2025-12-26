'use client';
import { useEffect, useRef, useState } from 'react';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { ChatHeader, ChatInput, MyChat, OtherChat } from '@/components/pages/chat';

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
    userId: 1,
  },
];
const myId = 0;

const ChatRoomPage = () => {
  const [messages, setMessages] = useState(data);

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

  const bottomRef = useRef<HTMLDivElement>(null);

  // 마지막 메세지 ref로 스크롤 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex h-[calc(100vh-112px)] flex-col'>
      <ChatHeader />

      <div className='scrollbar-thin ml-4 flex-1 overflow-y-auto pt-4'>
        {messages.map((item) =>
          item.userId === myId ? (
            <MyChat key={item.id} item={item} />
          ) : (
            <OtherChat key={item.id} item={item} />
          ),
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatRoomPage;
