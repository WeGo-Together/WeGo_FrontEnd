'use client';

import { useForm } from '@tanstack/react-form';

import { FormInput } from '@/components/shared';
import { Button } from '@/components/ui';
import { signupSchema } from '@/lib/schema/auth';

const getHintMessage = (errors: unknown[], isTouched: boolean, submissionAttempts: number) => {
  const firstError = errors[0] as { message?: string } | undefined;
  const showError = isTouched || submissionAttempts > 0;

  return showError ? firstError?.message : undefined;
};

export const SignupForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signupSchema,
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      // api 호출
      alert('signup:' + value.nickname);
    },
  });

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
            const {
              meta: { errors, isTouched },
            } = field.state;
            const hintMessage = getHintMessage(errors, isTouched, form.state.submissionAttempts);

            return (
              <FormInput
                hintMessage={hintMessage}
                inputProps={{
                  type: 'email',
                  placeholder: '이메일을 입력해주세요',
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
                labelName='이메일'
              />
            );
          }}
        </form.Field>

        <form.Field name='nickname'>
          {(field) => {
            const {
              meta: { errors, isTouched },
            } = field.state;
            const hintMessage = getHintMessage(errors, isTouched, form.state.submissionAttempts);

            return (
              <FormInput
                hintMessage={hintMessage}
                inputProps={{
                  placeholder: '닉네임을 입력해주세요',
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
                labelName='닉네임'
              />
            );
          }}
        </form.Field>

        <form.Field name='password'>
          {(field) => {
            const {
              meta: { errors, isTouched },
            } = field.state;
            const hintMessage = getHintMessage(errors, isTouched, form.state.submissionAttempts);

            return (
              <FormInput
                hintMessage={hintMessage}
                inputProps={{
                  type: 'password',
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
            const {
              meta: { errors, isTouched },
            } = field.state;
            const hintMessage = getHintMessage(errors, isTouched, form.state.submissionAttempts);

            return (
              <FormInput
                hintMessage={hintMessage}
                inputProps={{
                  type: 'password',
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

      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ canSubmit, isSubmitting }) => {
          const disabled = !canSubmit || isSubmitting;

          return (
            <Button
              className='border-none'
              disabled={disabled}
              size='md'
              type='submit'
              variant='primary'
            >
              회원가입하기
            </Button>
          );
        }}
      </form.Subscribe>
    </form>
  );
};
