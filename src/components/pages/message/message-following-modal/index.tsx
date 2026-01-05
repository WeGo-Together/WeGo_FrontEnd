import { useState } from 'react';

import { useForm } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Button, Input, ModalContent, ModalTitle, Toast, useModal } from '@/components/ui';
import { useToast } from '@/components/ui/toast/core';
import { useAddFollowers } from '@/hooks/use-follower';

export const FollowingModal = ({ userId }: { userId: number }) => {
  const { close } = useModal();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutateAsync } = useAddFollowers({ userId });
  const { run } = useToast();
  const form = useForm({
    defaultValues: { nickname: '' },
    onSubmit: async ({ value }) => {
      const { nickname } = value;
      setErrorMessage(null);
      try {
        await mutateAsync({ followNickname: nickname });
        close();
        run(<Toast type='success'>{nickname}님을 팔로우 했어요!</Toast>);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorMessage(error.detail.slice(4));
      }
    },
  });

  return (
    <ModalContent className='max-w-77.75'>
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
