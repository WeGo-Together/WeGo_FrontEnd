'use client';

import { type AnyFieldApi } from '@tanstack/react-form';

import { FormInput } from '@/components/shared';
import { getHintMessage } from '@/lib/auth/utils';
import { cn } from '@/lib/utils';

interface AvailabilityButtonProps {
  onClick: () => void;
  disabled: boolean;
}

type EmailCheck = {
  hint?: string;
  state: { status: 'idle' | 'checking' | 'available' | 'unavailable' | 'error' };
  isChecking: boolean;
  check: (value: string) => void | Promise<void>;
  reset: () => void;
};

interface Props {
  field: AnyFieldApi;
  withAvailabilityCheck?: boolean;
  emailCheck?: EmailCheck;
}

const AvailabilityButton = ({ onClick, disabled }: AvailabilityButtonProps) => {
  return (
    <button
      className={cn(
        'text-text-xs-semibold absolute top-4 right-5 rounded-lg bg-gray-100 px-3 py-1 text-gray-800',
        disabled && '!cursor-not-allowed',
      )}
      aria-disabled={disabled}
      aria-label='이메일 중복 확인'
      disabled={disabled}
      type='button'
      onClick={onClick}
    >
      중복 확인
    </button>
  );
};

export const EmailField = ({ field, withAvailabilityCheck = false, emailCheck }: Props) => {
  const hintMessage = getHintMessage(field);

  if (!withAvailabilityCheck || !emailCheck) {
    return (
      <FormInput
        hintMessage={hintMessage}
        inputProps={{
          type: 'email',
          autoComplete: 'email',
          placeholder: '이메일을 입력해주세요',
          value: field.state.value,
          onChange: (e) => field.handleChange(e.target.value),
        }}
        labelName='이메일'
      />
    );
  }

  const trimmedValue = field.state.value.trim();
  const hasValidationError = field.state.meta.errors.length > 0;

  const availabilityButtonDisabled = !trimmedValue || hasValidationError || emailCheck.isChecking;

  const iconButton = (
    <AvailabilityButton
      disabled={availabilityButtonDisabled}
      onClick={() => {
        void emailCheck.check(trimmedValue);
      }}
    />
  );

  return (
    <FormInput
      availabilityHint={emailCheck.hint}
      availabilityStatus={emailCheck.state}
      hintMessage={hintMessage}
      inputProps={{
        type: 'email',
        autoComplete: 'email',
        placeholder: '이메일을 입력해주세요',
        value: field.state.value,
        iconButton: iconButton,
        onChange: (e) => {
          field.handleChange(e.target.value);
          emailCheck.reset();
        },
      }}
      labelName='이메일'
    />
  );
};
