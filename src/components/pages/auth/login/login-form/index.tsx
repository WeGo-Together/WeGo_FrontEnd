'use client';

import { useForm } from '@tanstack/react-form';

import { PasswordField } from '@/components/pages/auth/fields';
import { useLogin } from '@/hooks/use-auth';
import { loginSchema } from '@/lib/schema/auth';

import { AuthSubmitButton } from '../../auth-button';
import { EmailField } from '../../fields/email-field';

export const LoginForm = () => {
  const login = useLogin();

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

      await login(payload, formApi);
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
        <form.Field children={(field) => <EmailField field={field} />} name='email' />
        <form.Field children={(field) => <PasswordField field={field} />} name='password' />
      </div>

      <form.Subscribe
        children={(state) => <AuthSubmitButton state={state} type='login' />}
        selector={(state) => state}
      />
    </form>
  );
};
