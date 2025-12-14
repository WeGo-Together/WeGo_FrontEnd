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
import { UpdateMyInfoPayload, User } from '@/types/service/user';

import { ImageField, MBTIField, MessageField, NickNameField } from '../profile-edit-fields';

interface Props {
  user: User;
}

export const ProfileEditModal = ({ user }: Props) => {
  const { profileImage: image, nickName, profileMessage, mbti } = user;

  const { close } = useModal();

  const {
    mutateAsync: updateUser,
    isPending: isUserInfoPending,
    error: _userInfoError,
  } = useUpdateUser();
  const {
    mutateAsync: updateUserImage,
    isPending: isUserImagePending,
    error: _userImageError,
  } = useUserImageUpdate();

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
      const nextProfileInfo: UpdateMyInfoPayload = {
        ...(user.nickName !== value.nickName && { nickName }),
        ...(user.profileMessage !== value.profileMessage && { profileMessage }),
        ...(user.mbti !== value.mbti && { mbti }),
      };

      const promises = [];

      // 프로필 정보 업데이트 조건 체크
      if (Object.keys(nextProfileInfo).length > 0) {
        promises.push(updateUser(nextProfileInfo));
      }

      // 프로필 이미지 업데이트 조건 체크
      const imageFileObject = Object.values(profileImage)[0];
      if (imageFileObject) {
        promises.push(updateUserImage({ file: imageFileObject }));
      }

      /*
      Promise 체이닝 사용 시 catch를 먹어버리기 때문에 각 mutation의 error가 업데이트 되지않음
      따라서 try catch 방식 사용
      */
      /*
      todo: 이미지 변경과 정보 변경 중 하나라도 실패하면 각 항목에 대한 에러메시지 보여줘야함
      */
      try {
        await Promise.all(promises);
        close();
      } catch (error) {
        console.log('요청 실패', error);
      }
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
