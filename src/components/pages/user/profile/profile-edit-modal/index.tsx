'use client';
import { useForm } from '@tanstack/react-form';

import { API } from '@/api';
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
import {
  mbtiOnBlurSchema,
  mbtiOnChangeSchema,
  nickNameOnChangeSchema,
  profileImageOnChangeSchema,
  profileMessageOnChangeSchema,
} from '@/lib/schema/mypage';
import { UpdateMyInfoPayloads, User } from '@/types/service/user';

import { ImageField, MBTIField, MessageField, NickNameField } from './profile-edit-fields';

interface Props {
  user: User;
}

export const ProfileEditModal = ({ user }: Props) => {
  const { profileImage: image, nickName, profileMessage, mbti } = user;

  const { close } = useModal();

  const { mutateAsync: updateUser, error: _userInfoError } = useUpdateUser();
  const { mutateAsync: updateUserImage, error: _userImageError } = useUserImageUpdate();

  const form = useForm({
    defaultValues: {
      profileImage: { [image]: null } as ImageRecord,
      nickName,
      profileMessage,
      mbti,
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (value.nickName === nickName) return null;
        const res = await API.userService.getNicknameAvailability({ nickName: value.nickName });
        if (!res.available) {
          return {
            form: '입력값을 확인해주세요',
            fields: {
              nickName: { message: '이미 사용중인 닉네임 입니다.' },
            },
          };
        }
        return null;
      },
    },

    onSubmit: async ({ value }) => {
      const { profileImage, nickName, profileMessage, mbti } = value;
      const nextMbti = mbti.toUpperCase();
      // 프로필 항목 업데이트 조건 체크
      const nextProfileInfo: UpdateMyInfoPayloads = {
        ...(user.nickName !== nickName && { nickName }),
        ...(user.profileMessage !== profileMessage && { profileMessage }),
        ...(user.mbti !== nextMbti && { mbti: nextMbti }),
      };

      /*
      Promise 체이닝 사용 시 catch를 먹어버리기 때문에 각 mutation의 error가 업데이트 되지않음
      따라서 try catch 방식 사용
      */
      try {
        // 프로필 정보 업데이트 조건 체크
        if (Object.keys(nextProfileInfo).length > 0) {
          await updateUser(nextProfileInfo);
        }
        // 프로필 이미지 업데이트 조건 체크
        const imageFileObject = Object.values(profileImage)[0];
        if (imageFileObject) {
          await updateUserImage({ file: imageFileObject });
        }
        close();
      } catch {
        alert(`업데이트에 실패했습니다. 잠시 후 다시 시도해주세요`);
      }
    },
  });

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
        <form.Field
          validators={{ onChange: profileImageOnChangeSchema }}
          children={(field) => <ImageField field={field} />}
          name='profileImage'
        />
        <form.Field
          validators={{ onChange: nickNameOnChangeSchema }}
          children={(field) => <NickNameField field={field} />}
          name='nickName'
        />
        <form.Field
          validators={{ onChange: profileMessageOnChangeSchema }}
          children={(field) => <MessageField field={field} />}
          name='profileMessage'
        />
        <form.Field
          validators={{ onChange: mbtiOnChangeSchema, onBlur: mbtiOnBlurSchema }}
          children={(field) => <MBTIField field={field} />}
          name='mbti'
        />
        <div className='mt-6 flex gap-2'>
          <Button variant='tertiary' onClick={close}>
            취소
          </Button>
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit} type='submit'>
                {isSubmitting ? '수정 중...' : '수정하기'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </ModalContent>
  );
};
