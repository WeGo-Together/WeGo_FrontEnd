// components/chat/ExpandableText.tsx
'use client';

import { ModalContent, ModalTitle, useModal } from '@/components/ui';
import { useExpandableText } from '@/hooks/useExpandableText';

interface Props {
  text: string;
  className?: string;
}

const LongTextModal = ({ text }: { text: string }) => (
  <ModalContent className='mx-4 w-full max-w-2xl'>
    <div className='mb-4'>
      <ModalTitle>메세지 전체보기</ModalTitle>
    </div>

    <div className='scrollbar-thin max-h-[70vh] overflow-y-auto px-1'>
      <div className='whitespace-pre-line text-gray-800'>{text}</div>
    </div>
  </ModalContent>
);

export const ExpandableText = ({ text, className }: Props) => {
  const { open } = useModal();
  const { textRef, isLongText } = useExpandableText(text);

  return (
    <>
      <span ref={textRef} className={`line-clamp-20 block whitespace-pre-line ${className}`}>
        {text}
      </span>

      {isLongText && (
        <button
          className='text-text-xs-medium text-mint-600 hover:text-mint-700 mt-2'
          onClick={() => open(<LongTextModal text={text} />)}
        >
          전체보기 →
        </button>
      )}
    </>
  );
};
