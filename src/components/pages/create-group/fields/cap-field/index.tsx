'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
  participantCount?: number;
}

export const GroupCapField = ({ field, participantCount = 0 }: Props) => {
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value < participantCount) field.handleChange(participantCount);
    else if (value < 2) field.handleChange(2);
    else if (value > 12) field.handleChange(12);
  };

  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='create-group-cap' required>
        최대 인원
      </Label>
      <Input
        id='create-group-cap'
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        frontIcon={
          <Icon
            id='users-1'
            width={20}
            className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
            height={20}
          />
        }
        max={12}
        min={2}
        placeholder='최대 인원을 선택해주세요'
        required
        type='number'
        value={!!field.state.value && field.state.value}
        onBlur={(e) => handleOnBlur(e)}
        onChange={(e) => {
          field.handleChange(Number(e.target.value));
        }}
      />
    </div>
  );
};
