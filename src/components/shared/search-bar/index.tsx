'use client';

import { useState } from 'react';

import { Icon } from '@/components/icon';
import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export const SearchBar = ({
  className,
  placeholder,
  onSearch,
  onChange,
  ...props
}: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  const handleIconClick = () => {
    onSearch?.(value);
  };

  const searchIconButton = (
    <button
      className='absolute top-4 right-5 h-6 w-6'
      aria-label='검색 실행'
      type='button'
      onClick={handleIconClick}
    >
      <Icon id='search' className='text-mint-600' />
    </button>
  );

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Input
        className='focus:border-mint-500 rounded-3xl border border-transparent bg-gray-100'
        iconButton={searchIconButton}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
