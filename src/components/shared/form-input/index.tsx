'use client';

import { InputHTMLAttributes, useId } from 'react';

import { Hint, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

type InputPropsWithIcon = InputHTMLAttributes<HTMLInputElement> & {
  iconButton?: React.ReactNode;
};

interface FormInputProps {
  className?: string;
  labelName?: string;
  hintMessage?: string;
  availabilityHint?: string;
  availabilityButtonDisabled?: boolean;
  availabilityStatus?: AvailabilityState;
  required?: boolean;
  inputProps?: InputPropsWithIcon;
  onClick?: () => void;
}

type AvailabilityState =
  | { status: 'idle' }
  | { status: 'checking' }
  | { status: 'available' }
  | { status: 'unavailable' }
  | { status: 'error' };

export const FormInput = ({
  className,
  labelName,
  hintMessage,
  availabilityHint,
  availabilityStatus,
  required = true,
  inputProps = {},
}: FormInputProps) => {
  const { type, id, required: _, iconButton, ...restInputProps } = inputProps;

  const generatedId = useId();

  const inputId = id ?? generatedId;

  let tone: 'default' | 'error' | 'success' = 'default';

  if (hintMessage || availabilityStatus?.status === 'unavailable') {
    tone = 'error';
  }

  if (availabilityStatus?.status === 'available') {
    tone = 'success';
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
          availabilityStatus && 'pr-23',
        )}
        iconButton={iconButton}
        required={required}
        type={type}
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
