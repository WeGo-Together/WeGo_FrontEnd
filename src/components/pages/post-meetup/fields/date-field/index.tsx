'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { DatePickerModal } from '@/components/pages/post-meetup/modals/date-picker-modal';
import { Label } from '@/components/ui';
import { useModal } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupDateField = ({ field }: Props) => {
  const { open } = useModal();
  const formattedDate = formatDate(new Date(field.state.value), 'YY.MM.DD - HH:mm');

  const onInputClick = () => {
    open(<DatePickerModal field={field} />);
  };

  return (
    <div className='mt-6 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-date' required onClick={onInputClick}>
        모임 날짜
      </Label>
      <button
        className='bg-mono-white focus:border-mint-500 relative cursor-pointer rounded-2xl border border-gray-300 p-4 pl-11 focus:outline-none'
        type='button'
        onClick={onInputClick}
      >
        <Icon
          id='calendar-1'
          width={20}
          className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
          height={20}
        />
        <p
          className={clsx(
            'text-text-md-medium text-left text-gray-500',
            formattedDate && 'text-gray-800',
          )}
        >
          {formattedDate ? formattedDate : '날짜와 시간을 선택해주세요'}
        </p>
      </button>
    </div>
  );
};

const formatDate = (date: Date, formatString: string) => {
  if (isNaN(date.getTime())) return false;

  const year = date.getFullYear().toString().substring(2, 4);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return formatString
    .replace(/YY/g, year)
    .replace(/MM/g, month)
    .replace(/DD/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds);
};
