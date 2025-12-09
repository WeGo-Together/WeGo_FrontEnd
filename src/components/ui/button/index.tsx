import React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('bg-mono-white w-full border transition', {
  variants: {
    variant: {
      primary: 'bg-mint-400 text-text-md-bold text-mono-white',
      secondary: 'border-mint-500 text-text-sm-semibold text-mint-500',
      tertiary: 'border-gray-400 text-text-sm-semibold text-gray-600',
      leave: 'border-gray-200 bg-mono-white text-gray-600 text-text-sm-semibold',
      chat: 'border-mint-500 bg-mint-500 text-mono-white text-text-sm-bold',
    },
    size: {
      md: 'h-13 rounded-2xl',
      sm: 'h-10 rounded-xl',
      xs: 'h-10 rounded-xl',
    },
    disabled: {
      true: '!cursor-not-allowed',
      false: 'hover:opacity-80',
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
  variant?: 'primary' | 'secondary' | 'tertiary' | 'leave' | 'chat';
  size?: 'md' | 'sm' | 'xs';
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
