'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupDetailField = ({ field }: Props) => {
  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-detail' required>
        모임 날짜
      </Label>
      <textarea
        id='post-meetup-detail'
        className='bg-mono-white focus:border-mint-500 text-text-md-medium h-40 w-full resize-none rounded-2xl border border-gray-300 px-5 py-4 text-gray-800 focus:outline-none'
        maxLength={300}
        placeholder='모임에 대해 설명해주세요'
        required
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <div className='text-text-sm-medium text-right text-gray-500'>0/300</div>
    </div>
  );
};
