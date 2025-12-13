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
import { useUpdateUser } from '@/hooks/use-user';
import { useUserImageUpdate } from '@/hooks/use-user/use-user-image-update';
import { UpdateMePayload, User } from '@/types/service/user';

import { ImageField, MBTIField, MessageField, NickNameField } from '../profile-edit-fields';

interface Props {
  user: User;
}

export const ProfileEditModal = ({ user }: Props) => {
  const { profileImage: image, nickName, profileMessage, mbti } = user;

  const { close } = useModal();

  const { mutateAsync: updateUser, isPending: isUserInfoPending } = useUpdateUser();
  const { mutateAsync: updateUserImage, isPending: isUserImagePending } = useUserImageUpdate();

  const form = useForm({
    defaultValues: {
      profileImage: { [image]: null } as ImageRecord,
      nickName,
      profileMessage,
      mbti,
    },
    onSubmit: async ({ value }) => {
      const { profileImage, nickName, profileMessage, mbti } = value;

      // 프로필 항목 업데이트 조건 체크
      const nextProfileInfo: UpdateMePayload = {
        ...(user.nickName !== value.nickName && { nickName }),
        ...(user.profileMessage !== value.profileMessage && { profileMessage }),
        ...(user.mbti !== value.mbti && { mbti }),
      };
      if (Object.values(nextProfileInfo).length > 0) {
        await updateUser(nextProfileInfo);
      }

      // 이미지 업데이트 조건 체크
      const imageFileObject = Object.values(profileImage)[0];
      if (imageFileObject) {
        await updateUserImage({ file: imageFileObject });
      }
      close();
    },
  });

  const isPending = isUserInfoPending || isUserImagePending;

  return (
    <ModalContent className='max-w-82.5'>
      <ModalTitle>프로필 수정</ModalTitle>
      <ModalDescription className='sr-only'>
        이 모달은 자신의 프로필을 수정할 수 있는 모달입니다.
      </ModalDescription>
      <form
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
          <Button disabled={isPending} type='submit'>
            {isPending ? '수정 중...' : '수정하기'}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
};
