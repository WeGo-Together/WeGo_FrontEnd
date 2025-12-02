import { Hint, Input, Label } from '@/components/ui';

interface FormInputProps {
  required?: boolean;
  labelName?: string;
  placeholder?: string;
  inputType?: string;
  hintMessage?: string;
  className?: string;
  value?: string;
}

export const FormInput = ({
  className,
  required,
  labelName,
  placeholder,
  inputType,
  hintMessage,
  value,
}: FormInputProps) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${className ?? ''}`}>
      <Label required={required}>{labelName}</Label>
      <Input
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300 focus:outline-none'
        placeholder={placeholder}
        type={inputType}
        value={value}
      />
      <Hint message={hintMessage} />
    </div>
  );
};
