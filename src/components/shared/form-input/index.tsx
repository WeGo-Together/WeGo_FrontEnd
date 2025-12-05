'use client';

import { InputHTMLAttributes, useId, useState } from 'react';

import { Icon } from '@/components/icon';
import { Hint, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

const PasswordToggleButton = ({ isVisible, onToggle }: PasswordToggleButtonProps) => {
  return (
    <button
      className='absolute top-4 right-5 h-6 w-6'
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
      tabIndex={-1}
      type='button'
      onClick={onToggle}
    >
      <Icon id={isVisible ? 'visibility-true' : 'visibility-false'} className='text-gray-600' />
    </button>
  );
};

interface FormInputProps {
  className?: string;
  labelName?: string;
  hintMessage?: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const FormInput = ({
  className,
  labelName,
  hintMessage,
  required = true,
  inputProps = {},
}: FormInputProps) => {
  const { type = 'text', id, required: _, ...restInputProps } = inputProps;

  const generatedId = useId();
  const [isVisible, setIsVisible] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && isVisible ? 'text' : type;
  const inputId = id ?? generatedId;

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <Label htmlFor={inputId} required={required}>
        {labelName}
      </Label>
      <Input
        aria-invalid={!!hintMessage}
        id={inputId}
        className={cn(
          'bg-mono-white focus:border-mint-500 h-14 rounded-2xl border border-gray-300',
          hintMessage && 'border-error-500',
        )}
        iconButton={
          isPasswordField ? (
            <PasswordToggleButton isVisible={isVisible} onToggle={handleToggle} />
          ) : undefined
        }
        required={required}
        type={inputType}
        {...restInputProps}
      />
      {hintMessage && <Hint message={hintMessage} />}
    </div>
  );
};
