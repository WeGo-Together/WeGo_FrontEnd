import { AnyFieldApi } from '@tanstack/react-form';

import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MessageField = ({ field }: Props) => {
  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-title' required>
        한 줄 소개
      </Label>

      <Input
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        placeholder='한 줄 소개를 입력해주세요'
        required
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
};
