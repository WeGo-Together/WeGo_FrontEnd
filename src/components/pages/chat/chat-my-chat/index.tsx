import { ExpandableText } from '@/components/chat/ExpandableText';

export const MyChat = ({ item }: IProps) => {
  const { text, time } = item;

  return (
    <div className='mr-3 mb-5 flex justify-end'>
      <div className='text-text-2xs-regular flex items-end py-1 text-gray-500'>{time}</div>

      <div className='ml-1.5'>
        <div className='bg-mint-200 mt-1 max-w-60 rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-2xl px-4 py-3'>
          <ExpandableText text={text} />
        </div>
      </div>
    </div>
  );
};
