'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Hint, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupDetailField = ({ field }: Props) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-Detail' required>
        모임 상세 정보
      </Label>
      <textarea
        id='post-meetup-Detail'
        className='bg-mono-white scrollbar-thin focus:border-mint-500 text-text-md-medium h-40 w-full resize-none rounded-2xl border border-gray-300 px-5 py-4 text-gray-800 focus:outline-none'
        maxLength={300}
        placeholder='모임에 대해 설명해주세요'
        required
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <div className='mt-0.5 flex'>
        {isInvalid && <Hint message={field.state.meta.errors[0].message} />}
        <div className='text-text-sm-medium ml-auto text-right text-gray-500'>
          {field.state.value.length}/300
        </div>
      </div>
    </div>
  );
};
