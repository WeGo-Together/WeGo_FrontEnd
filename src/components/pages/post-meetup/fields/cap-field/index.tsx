'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupCapField = ({ field }: Props) => {
  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-cap' required>
        최대 인원
      </Label>
      <Input
        id='post-meetup-cap'
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        frontIcon={
          <Icon
            id='users-1'
            width={20}
            className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
            height={20}
          />
        }
        placeholder='최대 인원을 선택해주세요'
        required
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
};
