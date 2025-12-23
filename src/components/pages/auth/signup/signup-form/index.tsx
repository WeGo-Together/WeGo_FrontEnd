'use client';

import { useForm } from '@tanstack/react-form';

import { API } from '@/api';
import { useSignup } from '@/hooks/use-auth';
import { useAvailabilityCheck } from '@/hooks/use-auth/use-auth-availabilityCheck';
import { signupSchema } from '@/lib/schema/auth';

import { AuthSubmitButton } from '../../auth-button';
import { EmailField, NicknameField, PasswordField, TermsAgreementField } from '../../fields';

export const SignupForm = () => {
  const signup = useSignup();

  const form = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      termsAgreement: false,
    },
    validators: {
      onChange: signupSchema,
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const payload = {
        email: value.email,
        password: value.password,
        nickName: value.nickname,
      };

      await signup(payload, formApi);
    },
  });

  const emailCheck = useAvailabilityCheck(
    API.userService.getEmailAvailability,
    (email) => ({ email }),
    {
      checking: '확인 중...',
      available: '사용 가능한 이메일입니다.',
      unavailable: '이미 사용 중인 이메일입니다.',
      error: '중복 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    },
  );

  const nicknameCheck = useAvailabilityCheck(
    API.userService.getNicknameAvailability,
    (nickName) => ({ nickName }),
    {
      checking: '확인 중...',
      available: '사용 가능한 닉네임입니다.',
      unavailable: '이미 사용 중인 닉네임입니다.',
      error: '중복 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    },
  );

  const canSubmitAll = emailCheck.isAvailable && nicknameCheck.isAvailable;

  return (
    <form
      className='flex-col-center w-full gap-8'
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <div className='flex-col-center w-full gap-4'>
        <form.Field
          children={(field) => (
            <EmailField emailCheck={emailCheck} field={field} withAvailabilityCheck />
          )}
          name='email'
        />
        <form.Field
          children={(field) => <NicknameField field={field} nicknameCheck={nicknameCheck} />}
          name='nickname'
        />

        <form.Field
          children={(field) => <PasswordField field={field} passwordType='signupPassword' />}
          name='password'
        />
        <form.Field
          children={(field) => <PasswordField field={field} passwordType='confirmPassword' />}
          name='confirmPassword'
        />
      </div>

      <div className='flex-col-center w-full gap-4'>
        <form.Field
          children={(field) => <TermsAgreementField field={field} />}
          name='termsAgreement'
        />

        <form.Subscribe
          children={(state) => (
            <AuthSubmitButton canSubmitAll={canSubmitAll} state={state} type='signup' />
          )}
          selector={(state) => state}
        />
      </div>
    </form>
  );
};
