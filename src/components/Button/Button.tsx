import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const ButtonVariants = cva(
  'cursor-pointer disabled:cursor-not-allowed smooth-color layout-center',
  {
    variants: {
      variant: {
        primary: `
        bg-brand-primary
        text-text-inverse
        hover:bg-interaction-hover
        active:bg-interaction-pressed
        disabled:bg-interaction-inactive
      `,
        outline: `
        border-1
        border-brand-primary
        text-brand-primary
        hover:border-interaction-hover
        hover:text-interaction-hover
        active:border-interaction-pressed
        active:text-interaction-pressed
        disabled:border-interaction-inactive
        disabled:text-interaction-inactive
      `,
        danger: `
        bg-status-danger
        text-text-inverse
        disabled:bg-interaction-inactive
      `,
      },
      size: {
        sm: 'rounded-2x text-md-semibold px-3 py-2',
        md: 'rounded-full text-md-semibold px-5 py-[11.5px]',
        lg: 'rounded-3x text-lg-semibold py-[14.5px] w-[332px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(ButtonVariants({ variant, size }), className)}
        {...props}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
