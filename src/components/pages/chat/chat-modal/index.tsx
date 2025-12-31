import { ModalContent, ModalTitle } from '@/components/ui';

export const LongTextModal = ({ text }: { text: string }) => (
  <ModalContent className='mx-4 w-full max-w-[311px]'>
    <div className='mb-4'>
      <ModalTitle>메세지 전체보기</ModalTitle>
    </div>

    <div className='scrollbar-thin max-h-[70vh] overflow-y-auto px-1'>
      <div className='whitespace-pre-line text-gray-800'>{text}</div>
    </div>
  </ModalContent>
);
