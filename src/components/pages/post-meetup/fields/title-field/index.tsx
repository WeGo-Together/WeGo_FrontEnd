'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Hint, Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupTitleField = ({ field }: Props) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className='mt-4 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-title' required>
        모임 제목
      </Label>

      <Input
        id='post-meetup-title'
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        frontIcon={
          <Icon
            id='edit-bar'
            width={20}
            className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
            height={20}
          />
        }
        placeholder='모임 제목을 입력해주세요'
        required
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />

      {isInvalid && <Hint className='mt-0.5' message={field.state.meta.errors[0].message} />}
    </div>
  );
};
