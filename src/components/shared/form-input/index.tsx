'use client';

import { useState } from 'react';

import { Icon } from '@/components/icon';
import { Hint, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName?: string;
  hintMessage?: string;
}

export const FormInput = ({
  className,
  required,
  labelName,
  hintMessage,
  type,
  id,
  ...inputProps
}: FormInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isPasswordField = type === 'password';

  const inputType = isVisible ? 'text' : type;
  const inputId = id ?? `form-input-${labelName ?? 'field'}`;

  const handleToggle = () => {
    if (!isPasswordField) return;
    setIsVisible((prev) => !prev);
  };

  const passwordIconButton = isPasswordField ? (
    <button
      className='absolute top-4 right-5 h-6 w-6'
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
      type='button'
      onClick={handleToggle}
    >
      <Icon id={isVisible ? 'visibility-true' : 'visibility-false'} className='text-gray-600' />
    </button>
  ) : null;

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <Label htmlFor={inputId} required={required}>
        {labelName}
      </Label>
      <Input
        id={inputId}
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        iconButton={isPasswordField && passwordIconButton}
        required={required}
        type={inputType}
        {...inputProps}
      />
      {hintMessage && <Hint message={hintMessage} />}
    </div>
  );
};
