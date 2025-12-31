import Image from 'next/image';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { formatKoreanTime } from '@/lib/formatDateTime';
import { ChatMessage } from '@/types/service/chat';

import { ExpandableText } from '../chat-long-text';

interface IProps {
  item: ChatMessage;
}

export const OtherChat = ({ item }: IProps) => {
  const { senderProfileImage, senderName, content, timestamp, createdAt } = item;
  const time = timestamp ?? createdAt;

  return (
    <div className='flex'>
      <Image
        width={40}
        className='mr-3 size-10 rounded-full object-cover'
        alt='프로필 이미지'
        height={40}
        src={senderProfileImage || DEFAULT_PROFILE_IMAGE}
      />

      <div className='mr-1.5 max-w-60'>
        <span className='text-text-xs-medium text-gray-800'>{senderName}</span>

        <div className='bg-mono-white mt-1 rounded-tl-sm rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-4 py-3'>
          <ExpandableText text={content} />
        </div>
      </div>

      <div className='text-text-2xs-regular flex items-end py-1 text-gray-500'>
        {time && formatKoreanTime(time)}
      </div>
    </div>
  );
};
