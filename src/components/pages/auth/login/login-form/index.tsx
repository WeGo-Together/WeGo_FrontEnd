'use client';

import { useEffect } from 'react';

import { useForm, useStore } from '@tanstack/react-form';

import { EmailField, PasswordField } from '@/components/pages/auth/fields';
import { useLogin } from '@/hooks/use-auth';
import { normalizePath } from '@/lib/auth/utils';
import { loginSchema } from '@/lib/schema/auth';

import { AuthSubmitButton } from '../../auth-button';
import { LoginSnsButton } from '../login-sns-button';

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

  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!GOOGLE_CLIENT_ID) {
      console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing');
      return;
    }

    const currentPathParam = new URLSearchParams(window.location.search).get('path');
    sessionStorage.setItem('post_login_path', normalizePath(currentPathParam));

    const redirectUri = `${window.location.origin}/auth/google/callback`;

    const state = crypto.randomUUID();
    sessionStorage.setItem('google_oauth_state', state);

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.search = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      prompt: 'select_account',
    }).toString();

    window.location.assign(url.toString());
  };

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
        <LoginSnsButton onClick={handleGoogleLogin}>Google로 로그인하기</LoginSnsButton>
        {loginError && <p className='text-error-500 text-text-sm-medium'>{loginError}</p>}
      </div>
    </form>
  );
};
