'use client';

import {
  useContextCalendars,
  useContextDatePickerOffsetPropGetters,
  useContextDaysPropGetters,
} from '@rehookify/datepicker';
import clsx from 'clsx';

import { Icon } from '@/components/icon';

export const DatePicker = () => {
  const { calendars, weekDays } = useContextCalendars();
  const { addOffset, subtractOffset } = useContextDatePickerOffsetPropGetters();
  const { dayButton } = useContextDaysPropGetters();

  const { year, month, days } = calendars[0];

  return (
    <div className='border-b-1 pb-3'>
      <div className='flex-between px-2'>
        <p className='text-text-md-semibold text-gray-800'>
          {year} {month}
        </p>

        <div className='flex justify-end gap-4'>
          <button {...subtractOffset({ months: 1 })} aria-label='Previous month'>
            <Icon id='chevron-left-1' className='text-gray-600' />
          </button>
          <button {...addOffset({ months: 1 })} aria-label='Next month'>
            <Icon id='chevron-right-1' className='text-gray-600' />
          </button>
        </div>
      </div>

      <div className='mt-2 border-gray-200'>
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
                {d.day.replace('일', '')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
