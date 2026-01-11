import { AnyFieldApi } from '@tanstack/react-form';

import { Hint, Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const NickNameField = ({ field }: Props) => {
  const isInvalid = !field.state.meta.isValid;
  const fieldId = 'profile-nickname';
  return (
    <div className='flex w-full flex-col gap-1'>
      <Label htmlFor={fieldId} required>
        닉네임
      </Label>
      <Input
        id={fieldId}
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        placeholder='닉네임을 입력해주세요'
        required
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {isInvalid && <Hint message={field.state.meta.errors[0].message} />}
    </div>
  );
};
