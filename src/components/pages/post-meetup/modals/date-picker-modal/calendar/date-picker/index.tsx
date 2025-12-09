'use client';

import { useEffect } from 'react';

import {
  useContextCalendars,
  useContextDatePickerOffsetPropGetters,
  useContextDays,
  useContextDaysPropGetters,
} from '@rehookify/datepicker';
import clsx from 'clsx';

import { Icon } from '@/components/icon';

interface Props {
  handleDateChange: (selectedDate: string) => void;
}

export const DatePicker = ({ handleDateChange }: Props) => {
  const { formattedDates } = useContextDays();
  const { calendars, weekDays } = useContextCalendars();
  const { addOffset, subtractOffset } = useContextDatePickerOffsetPropGetters();
  const { dayButton } = useContextDaysPropGetters();

  const { month, days } = calendars[0];

  useEffect(() => {
    handleDateChange(formattedDates[0].toString());
  }, [formattedDates]);

  return (
    <div>
      <div className='flex justify-end gap-4'>
        <button {...subtractOffset({ months: 1 })} aria-label='Previous month'>
          <Icon id='chevron-left-1' className='text-gray-600' />
        </button>
        <button {...addOffset({ months: 1 })} aria-label='Next month'>
          <Icon id='chevron-right-1' className='text-gray-600' />
        </button>
      </div>

      <div className='mt-2 border-b-1 border-gray-200 pb-3'>
        <ul className='grid grid-cols-7 text-gray-800'>
          {weekDays.map((day) => (
            <li key={`${month}-${day}`} className='flex-center size-10'>
              {day}
            </li>
          ))}
        </ul>
        <ul className='text-text-sm-regular grid grid-cols-7 grid-rows-5 gap-y-1 text-gray-800'>
          {days.map((d) => (
            <li key={d.$date.toDateString()}>
              <button
                {...dayButton(d)}
                className={clsx(
                  'flex-center size-10',
                  d.selected && 'bg-mint-500 text-text-sm-medium rounded-full text-white',
                  !d.inCurrentMonth && 'text-gray-600',
                )}
              >
                {d.day}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
