import { forwardRef, useState } from 'react';

import { Icon } from '@/components/shared';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onIconClick, ...props }, ref) => {
    const isPasswordField = type === 'password';
    const isSearchField = type === 'search';
    const [isVisible, setIsVisible] = useState(false);

    const inputType = isVisible || isSearchField ? 'text' : type;

    const handleToggle = () => {
      if (!isPasswordField) return;
      setIsVisible((prev) => !prev);
    };

    return (
      <div className='relative w-full'>
        <input
          ref={ref}
          className={cn(
            'text-text-md-medium w-full px-5 py-4 text-gray-800 focus:outline-none',
            className,
          )}
          type={inputType}
          {...props}
        />
        {isPasswordField && (
          <button
            className='absolute top-4 right-5 h-6 w-6'
            aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
            type='button'
            onClick={handleToggle}
          >
            <Icon
              id={isVisible ? 'visibility-true' : 'visibility-false'}
              className='text-gray-600'
            />
          </button>
        )}
        {isSearchField && (
          <button
            className='absolute top-4 right-5 h-6 w-6'
            aria-label='검색 실행'
            type='button'
            onClick={onIconClick}
          >
            <Icon id='search' className='text-mint-600' />
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
