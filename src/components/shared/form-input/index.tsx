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
  id,
  ...inputProps
}: FormInputProps) => {
  const inputId = id ?? `form-input-${labelName ?? 'field'}`;

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <Label htmlFor={inputId} required={required}>
        {labelName}
      </Label>
      <Input
        id={inputId}
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        required={required}
        {...inputProps}
      />
      {hintMessage && <Hint message={hintMessage} />}
    </div>
  );
};
