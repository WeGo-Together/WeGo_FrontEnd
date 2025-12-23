import { type AnyFormState } from '@tanstack/react-form';

import { Button } from '@/components/ui';

interface Props {
  state: AnyFormState;
  type: 'login' | 'signup';
  canSubmitAll?: boolean;
}

export const AuthSubmitButton = ({ state, type, canSubmitAll = true }: Props) => {
  const { canSubmit, isSubmitting, isPristine } = state;

  const disabled = !canSubmit || isSubmitting || isPristine || !canSubmitAll;

  const buttonName = type === 'login' ? '로그인하기' : '회원가입하기';

  return (
    <Button disabled={disabled} size='md' type='submit' variant='primary'>
      {buttonName}
    </Button>
  );
};
