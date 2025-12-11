'use client';

import clsx from 'clsx';

import type { TimePickerState } from '@/components/pages/post-meetup/modals/date-picker-modal/calendar';

interface Props {
  selectedTime: TimePickerState;
  onTimeChange: (type: string, val: string) => void;
}

export const TimePicker = ({ selectedTime, onTimeChange }: Props) => {
  return (
    <div className='flex h-75.25 justify-center border-b-1 pb-3'>
      {Object.entries(TIME_SELECTORS).map(([type, arr]) => (
        <ul
          key={type}
          className='scrollbar-thin scroll-stable w-full max-w-23.5 space-y-3 overflow-hidden text-center hover:overflow-y-scroll'
        >
          {arr.map((val) => (
            <li key={val}>
              <button
                className={clsx(
                  'text-text-sm-regular h-10 w-full max-w-20 rounded-lg text-gray-800',
                  selectedTime[type as keyof typeof TIME_SELECTORS] === val &&
                    'bg-mint-500 !text-text-sm-medium text-white',
                )}
                type='button'
                onClick={() => onTimeChange(type, val)}
              >
                {val}
              </button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

const TIME_SELECTORS = Object.freeze({
  hours: ['12'].concat(
    Array.from({ length: 11 }, (_, idx) => (idx + 1).toString().padStart(2, '0')),
  ),
  minutes: Array.from({ length: 12 }, (_, idx) => (idx * 5).toString().padStart(2, '0')),
  meridiem: ['AM', 'PM'],
});
