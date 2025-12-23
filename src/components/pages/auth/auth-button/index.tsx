import { AnyFormState } from '@tanstack/react-form';

import { Button } from '@/components/ui';

interface Props {
  state: AnyFormState;
  type: 'login' | 'signup';
}

export const AuthSubmitButton = ({ state, type }: Props) => {
  const { canSubmit, isSubmitting, isPristine } = state;

  const disabled = !canSubmit || isSubmitting || isPristine;

  const buttonName = type === 'login' ? '로그인하기' : '회원가입하기';

  return (
    <Button disabled={disabled} size='md' type='submit' variant='primary'>
      {buttonName}
    </Button>
  );
};
