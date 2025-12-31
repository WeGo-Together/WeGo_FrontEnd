'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { DatePickerModal } from '@/components/pages/create-group/modals/date-picker-modal';
import { Hint, Label } from '@/components/ui';
import { useModal } from '@/components/ui';
import { formatDateTime } from '@/lib/formatDateTime';

interface Props {
  field: AnyFieldApi;
}

export const GroupDateField = ({ field }: Props) => {
  const { open } = useModal();

  const hasValue = Boolean(field.state.value);
  const formattedDate = formatDateTime(field.state.value);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const onInputClick = () => {
    open(<DatePickerModal dateField={field} />);
  };

  return (
    <div className='mt-6 flex w-full flex-col gap-1'>
      <Label htmlFor='create-group-date' required onClick={onInputClick}>
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
            hasValue && 'text-gray-800',
          )}
        >
          {hasValue ? (
            formattedDate
          ) : (
            <span className='select-none'>날짜와 시간을 선택해주세요</span>
          )}
        </p>
      </button>
      {isInvalid && <Hint className='mt-0.5' message={field.state.meta.errors[0].message} />}
    </div>
  );
};
