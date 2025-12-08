'use client';
import { useForm } from '@tanstack/react-form';

import {
  Button,
  ImageRecord,
  ModalContent,
  ModalDescription,
  ModalTitle,
  useModal,
} from '@/components/ui';
import { User } from '@/types/service/user';

import ImageField from '../profile-edit-fields/image-field';
import { MBTIField } from '../profile-edit-fields/mbti-field';
import { MessageField } from '../profile-edit-fields/message-field';
import { NickNameField } from '../profile-edit-fields/nickname-field';

interface Props {
  user: User;
}

export const ProfileEditModal = ({ user }: Props) => {
  const { profileImage: image, nickName, profileMessage, mbti } = user;

  const { close } = useModal();

  const form = useForm({
    defaultValues: {
      profileImage: {
        [image]: null,
      } as ImageRecord,
      nickName,
      profileMessage,
      mbti,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      close();
    },
  });

  return (
    <ModalContent>
      <ModalTitle>프로필 수정</ModalTitle>
      <ModalDescription className='sr-only'>
        이 모달은 자신의 프로필을 수정할 수 있는 모달입니다.
      </ModalDescription>
      <form
        className='w-70.5'
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field children={(field) => <ImageField field={field} />} name='profileImage' />
        <form.Field children={(field) => <NickNameField field={field} />} name='nickName' />
        <form.Field children={(field) => <MessageField field={field} />} name='profileMessage' />
        <form.Field children={(field) => <MBTIField field={field} />} name='mbti' />
        <div className='mt-6 flex gap-2'>
          <Button variant='tertiary' onClick={close}>
            취소
          </Button>
          <Button type='submit'>수정하기</Button>
        </div>
      </form>
    </ModalContent>
  );
};
