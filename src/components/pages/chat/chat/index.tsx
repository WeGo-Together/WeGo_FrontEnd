'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { cn } from '@/lib/utils';
const dummy = [
  {
    id: 1,
    name: '토끼조아',
    message: '안녕하세요. 저는 토끼조아입니다 반가워요 혹시 어디 사시나요?',
    messageCount: 8,
  },
  {
    id: 2,
    name: '바다소년',
    message: '클라이밍 모임 하시나요?',
    messageCount: 12,
  },
  {
    id: 3,
    name: '흰둥이',
    message: '월월',
    messageCount: 1,
  },
  {
    id: 4,
    name: '여행자',
    message: '안녕하세요 여행자입니다.',
    messageCount: 0,
  },
  {
    id: 5,
    name: '한별',
    message: '고생하셨습니다',
    messageCount: 0,
  },
];

export const Chat = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/chat/1');
  };
  return (
    <ul className='flex flex-col'>
      {dummy.map((item) => (
        <li
          key={item.id}
          className='flex cursor-pointer items-center gap-3 bg-white p-5 transition hover:bg-gray-50'
          onClick={handleClick}
        >
          {/* 프로필 이미지 */}
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
            <span className='text-text-md-bold text-gray-800'>{item.name}</span>
            <span className={cn('text-text-sm-medium line-clamp-1 text-gray-700')}>
              {item.message}
            </span>
          </div>

          {/* 안 읽은 메시지 수 */}
          <span
            className={cn(
              'text-mono-white text-text-xs-bold rounded-full bg-red-500 px-2 py-0.5',
              item.messageCount === 0 && 'opacity-0',
            )}
          >
            {item.messageCount > 99 ? '99+' : item.messageCount}
          </span>
        </li>
      ))}
    </ul>
  );
};
