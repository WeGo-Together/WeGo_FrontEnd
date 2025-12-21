import { AnyFieldApi } from '@tanstack/react-form';

import { Hint, Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MessageField = ({ field }: Props) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldId = 'profile-message';
  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor={fieldId}>한 줄 소개</Label>
      <Input
        id={fieldId}
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        placeholder='한 줄 소개를 입력해주세요'
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {isInvalid && <Hint message={field.state.meta.errors[0].message} />}
    </div>
  );
};
