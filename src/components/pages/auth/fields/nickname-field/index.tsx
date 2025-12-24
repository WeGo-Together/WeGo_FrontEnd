'use client';

import { type AnyFieldApi } from '@tanstack/react-form';

import { FormInput } from '@/components/shared';
import { getHintMessage } from '@/lib/auth/utils';
import { cn } from '@/lib/utils';

interface AvailabilityButtonProps {
  onClick: () => void;
  disabled: boolean;
}

type NicknameCheck = {
  hint?: string;
  state: { status: 'idle' | 'checking' | 'available' | 'unavailable' | 'error' };
  isChecking: boolean;
  check: (value: string) => void | Promise<void>;
  reset: () => void;
};

interface Props {
  field: AnyFieldApi;
  nicknameCheck: NicknameCheck;
}

const AvailabilityButton = ({ onClick, disabled }: AvailabilityButtonProps) => {
  return (
    <button
      className={cn(
        'text-text-xs-semibold absolute top-4 right-5 rounded-lg bg-gray-100 px-3 py-1 text-gray-800',
        disabled && '!cursor-not-allowed',
      )}
      aria-disabled={disabled}
      aria-label='닉네임 중복 확인'
      disabled={disabled}
      type='button'
      onClick={onClick}
    >
      중복 확인
    </button>
  );
};

export const NicknameField = ({ field, nicknameCheck }: Props) => {
  const hintMessage = getHintMessage(field);

  const trimmedValue = field.state.value.trim();
  const hasValidationError = field.state.meta.errors.length > 0;

  const availabilityButtonDisabled =
    !trimmedValue || hasValidationError || nicknameCheck.isChecking;

  const iconButton = (
    <AvailabilityButton
      disabled={availabilityButtonDisabled}
      onClick={() => {
        void nicknameCheck.check(trimmedValue);
      }}
    />
  );

  return (
    <FormInput
      availabilityHint={nicknameCheck.hint}
      availabilityStatus={nicknameCheck.state}
      hintMessage={hintMessage}
      inputProps={{
        type: 'text',
        autoComplete: 'nickname',
        placeholder: '닉네임을 입력해주세요',
        value: field.state.value,
        iconButton: iconButton,
        onChange: (e) => {
          field.handleChange(e.target.value);
          nicknameCheck.reset();
        },
      }}
      labelName='닉네임'
    />
  );
};
