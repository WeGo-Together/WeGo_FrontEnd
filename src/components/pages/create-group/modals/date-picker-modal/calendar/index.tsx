'use client';

import { Activity, useEffect, useState } from 'react';

import { DatePickerStateProvider } from '@rehookify/datepicker';

import { CalendarFooter } from '@/components/pages/create-group/modals/date-picker-modal/calendar/calendar-footer';
import { DatePicker } from '@/components/pages/create-group/modals/date-picker-modal/calendar/date-picker';
import { TimePicker } from '@/components/pages/create-group/modals/date-picker-modal/calendar/time-picker';
import { AnimateDynamicHeight } from '@/components/shared';

interface Props {
  currentTab: 'date' | 'time';
  dateFieldValue: string;
  updateDateField: (selectedDate: string) => void;
}

export type TimePickerState = {
  hours: string;
  minutes: string;
  meridiem: 'AM' | 'PM';
};

export const Calendar = ({ currentTab, dateFieldValue, updateDateField }: Props) => {
  const nowDate = new Date();
  const prevDate = dateFieldValue ? new Date(dateFieldValue) : null;
  const [selectedDates, onDatesChange] = useState<Date[]>([prevDate ?? nowDate]);
  const [selectedTime, onTimeChange] = useState<TimePickerState>(() =>
    prevDate ? prevDateTo12Hour(prevDate) : { hours: '12', minutes: '00', meridiem: 'AM' },
  );

  useEffect(() => {
    const { newHours, newMinutes } = selectedTimeTo24Hour(selectedTime);

    selectedDates[0].setHours(newHours, newMinutes, 0, 0);
    updateDateField(selectedDates[0].toISOString());
  }, [selectedDates, selectedTime]);

  return (
    <section className='mt-4 select-none'>
      <DatePickerStateProvider
        config={{
          selectedDates,
          onDatesChange,
          locale: {
            locale: 'ko',
            day: 'numeric',
            weekday: 'short',
            monthName: 'numeric',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
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
        <AnimateDynamicHeight>
          <Activity mode={currentTab === 'date' ? 'visible' : 'hidden'}>
            <DatePicker />
          </Activity>
          <Activity mode={currentTab === 'time' ? 'visible' : 'hidden'}>
            <TimePicker
              selectedTime={selectedTime}
              onTimeChange={(type, val) => onTimeChange((prev) => ({ ...prev, [type]: val }))}
            />
          </Activity>
        </AnimateDynamicHeight>
        <CalendarFooter currentTab={currentTab} selectedTime={selectedTime} />
      </DatePickerStateProvider>
    </section>
  );
};

const selectedTimeTo24Hour = ({ hours, minutes, meridiem }: TimePickerState) => {
  let newHours = Number(hours);
  const newMinutes = Number(minutes);

  if (meridiem === 'PM' && hours !== '12') {
    newHours += 12;
  } else if (meridiem === 'AM' && hours === '12') {
    newHours = 0;
  }

  return { newHours, newMinutes };
};

const prevDateTo12Hour = (prevDate: Date): TimePickerState => {
  let hours = (prevDate.getHours() % 12).toString().padStart(2, '0');
  const minutes = prevDate.getMinutes().toString().padStart(2, '0');
  const meridiem = prevDate.getHours() >= 12 ? 'PM' : 'AM';

  if (hours === '00') hours = '12';

  return { hours, minutes, meridiem };
};
