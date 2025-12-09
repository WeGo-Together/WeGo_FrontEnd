import { Activity, useState } from 'react';

import { DatePickerStateProvider } from '@rehookify/datepicker';

import { CalendarFooter } from '@/components/pages/post-meetup/modals/date-picker-modal/calendar/calendar-footer';
import { DatePicker } from '@/components/pages/post-meetup/modals/date-picker-modal/calendar/date-picker';

interface Props {
  currentTab: 'date' | 'time';
  handleDateChange: (selectedDate: string) => void;
}

export const Calendar = ({ currentTab, handleDateChange }: Props) => {
  const nowDate = new Date();
  const [selectedDates, onDatesChange] = useState<Date[]>([nowDate]);

  return (
    <section className='mt-4 select-none'>
      <DatePickerStateProvider
        config={{
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
        }}
      >
        <Activity mode={currentTab === 'date' ? 'visible' : 'hidden'}>
          <DatePicker handleDateChange={handleDateChange} />
        </Activity>

        <CalendarFooter currentTab={currentTab} />
      </DatePickerStateProvider>
    </section>
  );
};
