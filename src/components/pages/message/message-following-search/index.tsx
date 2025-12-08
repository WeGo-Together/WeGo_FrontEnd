'use client';
import { Icon } from '@/components/icon';
import { Button, ModalContent, ModalTitle, useModal } from '@/components/ui';

const FollowerModal = () => {
  const { close } = useModal();

  const handleConfirm = () => {
    // 유저 팔로우 기능 ...
    console.log('팔로우 성공');
    close();
  };

  // 모달 모양 바뀌면 적용하기!
  return (
    <ModalContent>
      <ModalTitle className='mb-3'>팔로우 할 닉네임을 입력하세요</ModalTitle>
      <input
        className='text-text-sm-medium mb-3 w-full rounded-3xl bg-gray-100 px-4 py-2.5 text-gray-800'
        placeholder='nickname'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleConfirm();
          }
        }}
      />

      <div className='flex w-full flex-row gap-2'>
        <Button size='sm' variant='tertiary' onClick={close}>
          취소
        </Button>
        <Button size='sm' onClick={handleConfirm}>
          팔로우
        </Button>
      </div>
    </ModalContent>
  );
};

export const FollowingSearch = () => {
  const { open } = useModal();
  return (
    <div
      className='flex items-center gap-5 px-5 py-4 transition-all hover:cursor-pointer hover:opacity-80'
      onClick={() => open(<FollowerModal />)}
    >
      <div className='rounded-full border-2 border-dashed border-gray-400 bg-gray-100 p-2'>
        <Icon id='plus' className='size-6 text-gray-700' />
      </div>

      <span className='text-text-md-bold'>팔로우 추가</span>
    </div>
  );
};
