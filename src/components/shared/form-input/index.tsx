'use client';

import { InputHTMLAttributes, useId, useState } from 'react';

import { Icon } from '@/components/icon';
import { Hint, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

interface AvailabilityButtonProps {
  isEmailField: boolean;
  onClick: () => void;
  disabled: boolean;
}

interface FormInputProps {
  className?: string;
  labelName?: string;
  hintMessage?: string;
  availabilityHint?: string;
  availabilityButtonDisabled?: boolean;
  availabilityStatus?: AvailabilityState;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  onClick?: () => void;
}

type AvailabilityState =
  | { status: 'idle' }
  | { status: 'checking' }
  | { status: 'available' }
  | { status: 'unavailable' }
  | { status: 'error' };

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

const AvailabilityButton = ({ isEmailField, onClick, disabled }: AvailabilityButtonProps) => {
  return (
    <button
      className={cn(
        'text-text-xs-semibold absolute top-4 right-5 rounded-lg bg-gray-100 px-3 py-1 text-gray-800',
        disabled && '!cursor-not-allowed',
      )}
      aria-disabled={disabled}
      aria-label={isEmailField ? '이메일 중복 확인' : '닉네임 중복 확인'}
      disabled={disabled}
      type='button'
      onClick={onClick}
    >
      중복 확인
    </button>
  );
};

export const FormInput = ({
  className,
  labelName,
  hintMessage,
  availabilityHint,
  availabilityButtonDisabled = false,
  availabilityStatus,
  required = true,
  inputProps = {},
  onClick,
}: FormInputProps) => {
  const { type = 'text', id, required: _, ...restInputProps } = inputProps;

  const generatedId = useId();
  const [isVisible, setIsVisible] = useState(false);

  const isEmailField = type === 'email';
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && isVisible ? 'text' : type;
  const inputId = id ?? generatedId;
  const isAvailability = !isPasswordField && typeof onClick === 'function';

  let tone: 'default' | 'error' | 'success' = 'default';

  if (hintMessage || availabilityStatus?.status === 'unavailable') {
    tone = 'error';
  }

  if (availabilityStatus?.status === 'available') {
    tone = 'success';
  }

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  let iconButton: React.ReactNode = null;

  if (isPasswordField) {
    iconButton = <PasswordToggleButton isVisible={isVisible} onToggle={handleToggle} />;
  }

  if (!isPasswordField && isAvailability) {
    iconButton = (
      <AvailabilityButton
        disabled={availabilityButtonDisabled}
        isEmailField={isEmailField}
        onClick={onClick}
      />
    );
  }

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
          tone === 'error' && 'border-error-500',
          tone === 'success' && 'border-gray-300',
          isAvailability && 'pr-23',
        )}
        iconButton={iconButton}
        required={required}
        type={inputType}
        {...restInputProps}
      />
      {hintMessage && <Hint message={hintMessage} />}
      {availabilityHint && (
        <Hint
          className={cn(
            tone === 'error' && 'text-error-500',
            tone === 'success' && 'text-mint-600',
          )}
          message={availabilityHint}
        />
      )}
    </div>
  );
};
