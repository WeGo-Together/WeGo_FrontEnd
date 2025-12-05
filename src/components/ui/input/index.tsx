import { forwardRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconButton?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconButton, ...props }, ref) => {
    const hasIcon = !!iconButton;

    return (
      <div className='relative w-full'>
        <input
          ref={ref}
          className={cn(
            'text-text-md-medium w-full px-4 py-4 text-gray-800 focus:outline-none',
            hasIcon && 'pr-12 pl-5',
            className,
          )}
          type={type}
          {...props}
        />
        {iconButton}
      </div>
    );
  },
);

Input.displayName = 'Input';
