'use client';

import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, useState } from 'react';

import { Icon } from '@/components/icon';
import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

export const SearchBar = ({
  className,
  placeholder = '검색어를 입력하세요',
  onSearch,
  onChange,
  value,
  defaultValue = '',
  ...props
}: SearchBarProps) => {
  const isControlled = value !== undefined;

  const [innerValue, setInnerValue] = useState(defaultValue);

  const currentValue = isControlled ? value : innerValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!isControlled) {
      setInnerValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleSearch = () => {
    onSearch?.(currentValue ?? '');

    // 추가 동작 추천?
    // 검색 실행 전 공백 제거 로직
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Input
      className={cn(
        'focus:border-mint-500 rounded-3xl border border-transparent bg-gray-100',
        className,
      )}
      iconButton={
        <button
          className='absolute top-4 right-5 h-6 w-6'
          aria-label='검색 실행'
          type='button'
          onClick={handleSearch}
        >
          <Icon id='search' className='text-mint-600' />
        </button>
      }
      placeholder={placeholder}
      value={currentValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
