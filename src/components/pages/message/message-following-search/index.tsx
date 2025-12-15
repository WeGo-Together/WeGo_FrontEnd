'use client';
import { useState } from 'react';

import { Icon } from '@/components/icon';
import { Button, Input, ModalContent, ModalTitle, useModal } from '@/components/ui';
import { useAddFollowers } from '@/hooks/use-follower';

const FollowerModal = ({ userId }: { userId: number }) => {
  const { close } = useModal();
  const [nickname, setNickname] = useState('');
  const { mutate: addFollower } = useAddFollowers({ userId });

  const handleConfirm = () => {
    addFollower({ followNickname: nickname });
    close();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
  };

  // 모달 모양 바뀌면 적용하기!
  return (
    <ModalContent>
      <ModalTitle className='mb-3'>팔로우 할 닉네임을 입력하세요</ModalTitle>
      <Input
        className='text-text-sm-medium mb-3 w-full rounded-3xl bg-gray-100 px-4 py-2.5 text-gray-800'
        iconButton={<Icon id='search' className='absolute top-2.5 right-3 size-5 text-gray-500' />}
        placeholder='nickname'
        onChange={handleChange}
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

export const FollowingSearch = ({ userId }: { userId: number }) => {
  const { open } = useModal();
  return (
    <div
      className='flex items-center gap-5 px-5 py-4 transition-all hover:cursor-pointer hover:opacity-80'
      onClick={() => open(<FollowerModal userId={userId} />)}
    >
      <div className='rounded-full border-2 border-dashed border-gray-400 bg-gray-100 p-2'>
        <Icon id='plus' className='size-6 text-gray-700' />
      </div>

      <span className='text-text-md-bold'>팔로우 추가</span>
    </div>
  );
};
