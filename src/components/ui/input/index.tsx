import { forwardRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

// 둘 다 없음
interface NoneIcons {
  frontIcon?: undefined;
  iconButton?: undefined;
}

// frontIcon만
interface OnlyFront {
  frontIcon: ReactNode;
  iconButton?: undefined;
}

// backIcon만
interface OnlyBack {
  frontIcon?: undefined;
  iconButton: ReactNode;
}

type InputProps = (NoneIcons | OnlyFront | OnlyBack) & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconButton, frontIcon, ...props }, ref) => {
    const hasIcon = !!iconButton;
    const hasFrontIcon = !!frontIcon;

    return (
      <div className='relative w-full'>
        {frontIcon}
        <input
          ref={ref}
          className={cn(
            'text-text-md-medium w-full px-4 py-4 text-gray-800 focus:outline-none',
            hasIcon && 'pr-11',
            hasFrontIcon && 'pl-11',
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
