'use client';

import { Icon } from '@/components/icon';
import { useModal } from '@/components/ui';
import { useLongText } from '@/hooks/use-chat/use-chat-longText';

import { LongTextModal } from '../chat-modal';

interface Props {
  text: string;
  className?: string;
}

export const ExpandableText = ({ text, className }: Props) => {
  const { open } = useModal();
  const { textRef, isLongText } = useLongText(text);

  return (
    <>
      <span
        ref={textRef}
        className={`line-clamp-20 block whitespace-pre-line text-gray-800 ${className}`}
      >
        {text}
      </span>

      {isLongText && (
        <button
          className='text-text-xs-medium mt-2 flex items-center'
          onClick={() => open(<LongTextModal text={text} />)}
        >
          <span className='text-gray-500'>전체보기 </span>
          <Icon id='chevron-right-1' className='w-4 text-gray-600' />
        </button>
      )}
    </>
  );
};
