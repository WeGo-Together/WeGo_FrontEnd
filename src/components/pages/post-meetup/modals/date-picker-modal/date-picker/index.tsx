import { useEffect, useState } from 'react';

import { useDatePicker } from '@rehookify/datepicker';
import clsx from 'clsx';

import { Icon } from '@/components/icon';

interface Props {
  currentTab: 'date' | 'time';
  handleDateChange: (date: string) => void;
}

export const DatePicker = ({ currentTab, handleDateChange }: Props) => {
  const nowDate = new Date();
  const [selectedDates, onDatesChange] = useState<Date[]>([nowDate]);

  useEffect(() => {
    handleDateChange(selectedDates.toString());
  }, [selectedDates]);

  const {
    data: { weekDays, calendars },
    propGetters: { dayButton, addOffset, subtractOffset },
  } = useDatePicker({
    selectedDates,
    onDatesChange,
    locale: {
      day: 'numeric',
      weekday: 'short',
      monthName: 'numeric',
    },
    dates: {
      minDate: nowDate,
      maxDate: new Date(nowDate.getFullYear() + 1, 12, 0),
    },
    calendar: {
      mode: 'fluid',
    },
  });

  const { year, month, days } = calendars[0];

  return (
    <section className='mt-4 select-none'>
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

      <div className='text-text-md-semibold flex-center mt-3 gap-2.5 text-gray-700'>
        <span>{year}년</span>
        <span className={currentTab === 'date' ? 'text-mint-600' : ''}>
          {month}월 {selectedDates[0].getDate()}일
        </span>
        <span className={currentTab === 'time' ? 'text-mint-600' : ''}>12:20</span>
        <span>AM</span>
        <span>PM</span>
      </div>
    </section>
  );
};
