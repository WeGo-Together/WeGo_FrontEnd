'use client';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';

import { API } from '@/api';
import { Icon } from '@/components/icon';
import { FormInput } from '@/components/shared';
import { Button, useModal } from '@/components/ui';
import { useSignup } from '@/hooks/use-auth';
import { useAvailabilityCheck } from '@/hooks/use-auth/use-auth-availabilityCheck';
import { signupSchema } from '@/lib/schema/auth';
import { cn } from '@/lib/utils';

import { SignupAgreementModal } from '../signup-agreement-modal';

const getHintMessage = (field: AnyFieldApi) => {
  const {
    meta: { errors, isTouched },
  } = field.state;
  const { submissionAttempts } = field.form.state;

  const firstError = errors[0] as { message?: string } | undefined;
  const showError = isTouched || submissionAttempts > 0;

  return showError ? firstError?.message : undefined;
};

export const SignupForm = () => {
  const signup = useSignup();
  const { open } = useModal();

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

  const canSubmit = emailCheck.isAvailable && nicknameCheck.isAvailable;

  return (
    <form
      className='flex-col-center w-full gap-8'
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <div className='flex-col-center w-full gap-4'>
        <form.Field name='email'>
          {(field) => {
            const validationHint = getHintMessage(field);

            const trimmedValue = field.state.value.trim();
            const hasValidationError = field.state.meta.errors.length > 0;

            const availabilityButtonDisabled =
              !trimmedValue || hasValidationError || emailCheck.isChecking;

            return (
              <FormInput
                availabilityButtonDisabled={availabilityButtonDisabled}
                availabilityHint={emailCheck.hint}
                availabilityStatus={emailCheck.state}
                hintMessage={validationHint}
                inputProps={{
                  type: 'email',
                  autoComplete: 'email',
                  placeholder: '이메일을 입력해주세요',
                  value: field.state.value,
                  onChange: (e) => {
                    field.handleChange(e.target.value);
                    emailCheck.reset();
                  },
                }}
                labelName='이메일'
                onClick={() => {
                  void emailCheck.check(trimmedValue);
                  console.log(nicknameCheck.state);
                }}
              />
            );
          }}
        </form.Field>

        <form.Field name='nickname'>
          {(field) => {
            const validationHint = getHintMessage(field);

            const trimmedValue = field.state.value.trim();
            const hasValidationError = field.state.meta.errors.length > 0;

            const availabilityButtonDisabled =
              !trimmedValue || hasValidationError || nicknameCheck.isChecking;

            return (
              <FormInput
                availabilityButtonDisabled={availabilityButtonDisabled}
                availabilityHint={nicknameCheck.hint}
                availabilityStatus={nicknameCheck.state}
                hintMessage={validationHint}
                inputProps={{
                  autoComplete: 'username',
                  placeholder: '닉네임을 입력해주세요',
                  value: field.state.value,
                  onChange: (e) => {
                    field.handleChange(e.target.value);
                    nicknameCheck.reset();
                  },
                }}
                labelName='닉네임'
                onClick={() => {
                  nicknameCheck.check(trimmedValue);
                  console.log(nicknameCheck.state);
                }}
              />
            );
          }}
        </form.Field>

        <form.Field name='password'>
          {(field) => {
            const hintMessage = getHintMessage(field);

            return (
              <FormInput
                hintMessage={hintMessage}
                inputProps={{
                  type: 'password',
                  autoComplete: 'new-password',
                  placeholder: '비밀번호를 입력해주세요',
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
                labelName='비밀번호'
              />
            );
          }}
        </form.Field>

        <form.Field name='confirmPassword'>
          {(field) => {
            const hintMessage = getHintMessage(field);

            return (
              <FormInput
                hintMessage={hintMessage}
                inputProps={{
                  type: 'password',
                  autoComplete: 'new-password',
                  placeholder: '비밀번호를 한 번 더 입력해주세요',
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
                labelName='비밀번호 확인'
              />
            );
          }}
        </form.Field>
      </div>

      <div className='flex-col-center w-full gap-4'>
        <form.Field name='termsAgreement'>
          {(field) => {
            const checked = Boolean(field.state.value);
            return (
              <div className='flex w-full items-center justify-between'>
                <label className='flex-center cursor-pointer'>
                  <input
                    className='peer sr-only'
                    checked={checked}
                    name={field.name}
                    type='checkbox'
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  <Icon id='check' className={cn(checked ? 'text-mint-500' : 'text-gray-500')} />
                  <span className='text-text-sm-medium text-gray-700'>
                    서비스 이용약관에 동의합니다.
                  </span>
                </label>

                <button
                  className='text-text-sm-medium text-gray-500 underline'
                  type='button'
                  onClick={() => open(<SignupAgreementModal />)}
                >
                  보기
                </button>
              </div>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            isPristine: state.isPristine,
          })}
        >
          {({ canSubmit: formCanSubmit, isSubmitting, isPristine }) => {
            const disabled = !formCanSubmit || isSubmitting || isPristine || !canSubmit;

            return (
              <Button disabled={disabled} size='md' type='submit' variant='primary'>
                회원가입하기
              </Button>
            );
          }}
        </form.Subscribe>
      </div>
    </form>
  );
};
