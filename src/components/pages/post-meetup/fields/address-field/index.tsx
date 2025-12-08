'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupAddressField = ({ field }: Props) => {
  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-address' required>
        모임 장소
      </Label>
      <Input
        id='post-meetup-address'
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        frontIcon={
          <Icon
            id='map-pin-1'
            width={20}
            className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
            height={20}
          />
        }
        placeholder='모임 주소를 입력해주세요'
        required
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
};
