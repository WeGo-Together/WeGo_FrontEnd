import { formatKoreanTime } from '@/lib/formatDateTime';
import { ChatMessage } from '@/types/service/chat';

import { ExpandableText } from '../chat-long-text';

interface IProps {
  item: ChatMessage;
}

export const MyChat = ({ item }: IProps) => {
  const { content, timestamp, createdAt } = item;

  const time = timestamp ?? createdAt;

  return (
    <div className='mr-3 flex justify-end'>
      <div className='text-text-2xs-regular flex items-end py-1 text-gray-500'>
        {time && formatKoreanTime(time)}
      </div>

      <div className='ml-1.5'>
        <div className='bg-mint-200 mt-1 max-w-60 rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-2xl px-4 py-3'>
          <ExpandableText text={content} />
        </div>
      </div>
    </div>
  );
};
