import { useState } from 'react';

import { useForm } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Button, Input, ModalContent, ModalTitle, useModal } from '@/components/ui';
import { useAddFollowers } from '@/hooks/use-follower';

export const FollowingModal = ({ userId }: { userId: number }) => {
  const { close } = useModal();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: addFollower } = useAddFollowers({ userId });
  const form = useForm({
    defaultValues: {
      nickname: '',
    },
    onSubmit: ({ value }) => {
      const { nickname } = value;
      setErrorMessage(null);

      addFollower(
        {
          followNickname: nickname,
        },
        {
          onSuccess: () => {
            close();
          },
          onError: () => {
            setErrorMessage('존재하지 않는 유저입니다.');
          },
        },
      );
    },
  });
  return (
    <ModalContent className='mx-8'>
      <ModalTitle className='mb-3'>팔로우 할 닉네임을 입력하세요</ModalTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className='mb-3'>
          <form.Field
            children={(field) => (
              <Input
                className='text-text-sm-medium w-full rounded-3xl bg-gray-100 px-4 py-2.5 text-gray-800'
                iconButton={
                  <Icon id='search' className='absolute top-2.5 right-3 size-5 text-gray-500' />
                }
                placeholder='nickname'
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setErrorMessage(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    form.handleSubmit();
                  }
                }}
              />
            )}
            name='nickname'
          ></form.Field>
        </div>
        {errorMessage && <p className='text-error-500 mb-2 ml-2 text-sm'>{errorMessage}</p>}
        <div className='flex w-full flex-row gap-2'>
          <Button size='sm' type='button' variant='tertiary' onClick={close}>
            취소
          </Button>
          <Button size='sm' type='submit'>
            팔로우
          </Button>
        </div>
      </form>
    </ModalContent>
  );
};
