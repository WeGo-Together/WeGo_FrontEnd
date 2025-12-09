'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { DatePickerModal } from '@/components/pages/post-meetup/modals/date-picker-modal';
import { Label } from '@/components/ui';
import { useModal } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupDateField = ({ field }: Props) => {
  const { open } = useModal();

  const value = field.state.value.date + field.state.value.time;

  return (
    <div className='mt-6 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-date' required>
        모임 날짜
      </Label>
      <button
        className='bg-mono-white focus:border-mint-500 relative cursor-pointer rounded-2xl border border-gray-300 p-4 pl-11 focus:outline-none'
        type='button'
        onClick={() => open(<DatePickerModal field={field} />)}
      >
        <Icon
          id='calendar-1'
          width={20}
          className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
          height={20}
        />
        <p className='text-left text-gray-500'>
          {value.trim() ? value : '날짜와 시간을 선택해주세요'}
        </p>
      </button>
    </div>
  );
};
