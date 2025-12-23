'use client';

import { useEffect } from 'react';

import { useForm, useStore } from '@tanstack/react-form';

import { EmailField, PasswordField } from '@/components/pages/auth/fields';
import { useLogin } from '@/hooks/use-auth';
import { loginSchema } from '@/lib/schema/auth';

import { AuthSubmitButton } from '../../auth-button';

export const LoginForm = () => {
  const { handleLogin, loginError, clearLoginError } = useLogin();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
      onChange: loginSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const payload = {
        email: value.email,
        password: value.password,
      };

      await handleLogin(payload, formApi);
    },
  });

  const { email, password } = useStore(form.baseStore, (state) => state.values);

  useEffect(() => {
    clearLoginError();
  }, [email, password, clearLoginError]);

  return (
    <form
      className='flex-col-center w-full gap-8'
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <div className='flex-col-center w-full gap-4'>
        <form.Field children={(field) => <EmailField field={field} />} name='email' />
        <form.Field
          children={(field) => <PasswordField field={field} passwordType='loginPassword' />}
          name='password'
        />
      </div>

      <div className='flex-col-center w-full gap-2'>
        <form.Subscribe
          children={(state) => <AuthSubmitButton state={state} type='login' />}
          selector={(state) => state}
        />
        {loginError && <p className='text-error-500 text-text-sm-medium'>{loginError}</p>}
      </div>
    </form>
  );
};
