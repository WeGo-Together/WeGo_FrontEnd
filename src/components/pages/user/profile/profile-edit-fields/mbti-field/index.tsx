import { AnyFieldApi } from '@tanstack/react-form';

import { Hint, Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MBTIField = ({ field }: Props) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldId = 'profile-mbti';
  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor={fieldId}>MBTI</Label>
      <Input
        id={fieldId}
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        maxLength={4}
        placeholder='MBTI를 입력해주세요'
        type='text'
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          field.handleChange(e.target.value);
          field.setMeta((prev) => ({
            ...prev,
            errorMap: {
              ...prev.errorMap,
              onBlur: undefined,
            },
          }));
        }}
      />
      {isInvalid && <Hint message={field.state.meta.errors[0].message} />}
    </div>
  );
};
