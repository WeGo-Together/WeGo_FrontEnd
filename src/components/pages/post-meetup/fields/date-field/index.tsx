'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupDateField = ({ field }: Props) => {
  return (
    <div className='mt-6 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-date' required>
        모임 날짜
      </Label>
      <Input
        id='post-meetup-date'
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        frontIcon={
          <Icon
            id='calendar'
            width={20}
            className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
            height={20}
          />
        }
        placeholder='날짜와 시간을 선택해주세요'
        required
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
};
