import React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'bg-mono-white w-full rounded-[16px] border transition hover:cursor-pointer hover:opacity-80 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-mint-400 text-mono-white disabled:bg-gray-400',
        secondary: 'border-mint-500 text-mint-500 disabled:border-gray-400 disabled:text-gray-400',
        tertiary: 'border-gray-400 text-gray-600 disabled:text-gray-400',
      },
      size: {
        md: 'text-text-md-bold h-14',
        sm: 'text-text-sm-semibold h-11 max-w-[112px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'md' | 'sm';
}

export const Button = ({ className, variant, size, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
};
