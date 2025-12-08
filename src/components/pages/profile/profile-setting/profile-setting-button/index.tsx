'use client';

import React, { ButtonHTMLAttributes } from 'react';

import * as m from 'motion/react-m';

interface ToggleButtonProps extends Omit<ButtonProps, 'value'> {
  value?: boolean;
}
export const ProfileToggleButton = ({ children, value = false, ...props }: ToggleButtonProps) => {
  return (
    <Button {...props}>
      {children}
      <ToggleUI value={value} />
    </Button>
  );
};

type ActionButtonProps = ButtonProps;

export const ProfileActionButton = ({ children, ...props }: ActionButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className='text-text-sm-semibold flex cursor-pointer flex-row items-center justify-between rounded-xl px-3 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-50'
      {...props}
    >
      {children}
    </button>
  );
};

interface ToggleUIProps {
  value?: boolean;
}

const ToggleUI = ({ value = false }: ToggleUIProps) => {
  return (
    <div className='bg-mint-500 flex h-5 w-9 cursor-pointer rounded-full p-0.5'>
      <m.div
        className='bg-mono-white size-4 rounded-full'
        animate={{ x: value ? 16 : 0 }}
        transition={{
          type: 'spring',
          duration: 0.3,
          bounce: 0.3,
        }}
      />
    </div>
  );
};
