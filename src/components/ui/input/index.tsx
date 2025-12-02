import { useState } from 'react';

import Icon from '@/components/shared/icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
}

export const Input = ({ className, type, onIconClick, ...props }: InputProps) => {
  const isPasswordField = type === 'password';
  const [isVisible, setIsVisible] = useState(false);

  const inputType = isVisible || type === 'search' ? 'text' : type;

  const handleToggle = () => {
    if (!isPasswordField) return;
    setIsVisible((prev) => !prev);
  };

  return (
    <div className='layout-center relative w-full'>
      <input
        className={`text-text-md-medium w-full px-5 py-4 text-gray-800 ${className ?? ''}`}
        type={inputType}
        {...props}
      />
      {isPasswordField && (
        <button className='absolute top-4 right-5 h-6 w-6' type='button' onClick={handleToggle}>
          <Icon id={isVisible ? 'visibility-true' : 'visibility-false'} className='text-gray-600' />
        </button>
      )}
      {type === 'search' && (
        <button className='absolute top-4 right-5 h-6 w-6' type='button' onClick={onIconClick}>
          <Icon id='search' className='text-mint-600' />
        </button>
      )}
    </div>
  );
};
