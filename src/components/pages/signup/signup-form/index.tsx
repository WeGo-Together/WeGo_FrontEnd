'use client';

import { useRouter } from 'next/navigation';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';

import { API } from '@/api';
import { isProblemDetailError } from '@/api/service';
import { FormInput } from '@/components/shared';
import { Button } from '@/components/ui';
import { signupSchema } from '@/lib/schema/auth';

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
  const router = useRouter();

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
    onSubmit: async ({ value, formApi }) => {
      try {
        const payload = {
          email: value.email,
          password: value.password,
          nickName: value.nickname,
        };

        const result = await API.authService.signup(payload);
        console.log('signup success:', result);

        formApi.reset();
        router.push('/login');
      } catch (error) {
        if (isProblemDetailError(error) && error.response?.data) {
          const problem = error.response.data;

          console.error('[SIGNUP ERROR]', problem.errorCode, problem.detail);
          alert(problem.detail || '회원가입에 실패했습니다.');
        } else {
          console.error(error);
          alert('알 수 없는 오류가 발생했습니다.');
        }
      }
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
            const hintMessage = getHintMessage(field);

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
            const hintMessage = getHintMessage(field);

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
            const hintMessage = getHintMessage(field);

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
            const hintMessage = getHintMessage(field);

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
          isPristine: state.isPristine,
        })}
      >
        {({ canSubmit, isSubmitting, isPristine }) => {
          const disabled = !canSubmit || isSubmitting || isPristine;

          return (
            <Button disabled={disabled} size='md' type='submit' variant='primary'>
              회원가입하기
            </Button>
          );
        }}
      </form.Subscribe>
    </form>
  );
};
