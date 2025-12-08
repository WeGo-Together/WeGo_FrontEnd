import { AnyFieldApi } from '@tanstack/react-form';

import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MBTIField = ({ field }: Props) => {
  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-title' required>
        MBTI
      </Label>

      <Input
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        placeholder='MBTI를 입력해주세요'
        required
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
};
