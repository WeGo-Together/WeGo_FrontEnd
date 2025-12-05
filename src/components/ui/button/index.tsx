import React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'bg-mono-white w-full border transition hover:cursor-pointer hover:opacity-80 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-mint-400 text-mono-white disabled:bg-gray-400',
        secondary: 'border-mint-500 text-mint-500 disabled:border-gray-400 disabled:text-gray-400',
        tertiary: 'border-gray-400 text-gray-600 disabled:text-gray-400',
        leave: 'border-gray-200 bg-mono-white text-gray-600 text-text-sm-semibold',
        chat: 'border-mint-500 bg-mint-500 text-mono-white text-text-sm-bold',
      },
      size: {
        md: 'text-text-md-bold h-14 rounded-[16px]',
        sm: 'text-text-sm-semibold h-11 max-w-[112px] rounded-[16px]',
        xs: 'h-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'leave' | 'chat';
  size?: 'md' | 'sm' | 'xs';
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  className,
  variant,
  size,
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} type={type} {...props}>
      {children}
    </button>
  );
};
