import React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('bg-mono-white w-full border transition', {
  variants: {
    variant: {
      primary: 'bg-mint-400 text-text-md-bold text-mono-white hover:bg-mint-600 active:bg-mint-700',
      secondary:
        'border-mint-500 text-text-sm-semibold text-mint-500 active:text-mint-700 active:border-mint-600 hover:bg-gray-50 active:bg-gray-100',
      tertiary:
        'text-text-sm-semibold border-gray-400 text-gray-600 hover:bg-gray-50 active:bg-gray-100',
    },
    size: {
      md: 'h-13 rounded-2xl',
      sm: 'h-10 rounded-xl',
    },
    disabled: {
      true: '!cursor-not-allowed',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      class: 'bg-gray-400',
    },
    {
      variant: 'secondary',
      disabled: true,
      class: 'border-gray-400 text-gray-400',
    },
    {
      variant: 'tertiary',
      disabled: true,
      class: 'text-gray-400',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'md' | 'sm';
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  className,
  variant,
  size,
  disabled = false,
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, disabled: !!disabled }), className)}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
