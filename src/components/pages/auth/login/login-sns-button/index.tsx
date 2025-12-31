'use client';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const LoginSnsButton = ({ children, onClick }: Props) => {
  return (
    <Button
      className='flex-center text-text-md-semibold relative text-gray-700'
      size='md'
      variant='tertiary'
      onClick={onClick}
    >
      <Icon id='google-login' className='absolute top-3.5 left-6 size-6' />
      <span>{children}</span>
    </Button>
  );
};
