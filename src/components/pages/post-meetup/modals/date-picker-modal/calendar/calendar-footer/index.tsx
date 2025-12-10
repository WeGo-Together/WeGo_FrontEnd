'use client';

import { useContextDays } from '@rehookify/datepicker';

import type { TimePickerState } from '@/components/pages/post-meetup/modals/date-picker-modal/calendar';

interface Props {
  currentTab: 'date' | 'time';
  selectedTime: TimePickerState;
}

export const CalendarFooter = ({
  selectedTime: { hours, minutes, meridiem },
  currentTab,
}: Props) => {
  const { selectedDates } = useContextDays();

  return (
    <div className='text-text-md-semibold flex-center mt-3 flex-wrap gap-2.5 text-gray-700'>
      <span>{selectedDates[0].getFullYear()}년</span>
      <span className={currentTab === 'date' ? 'text-mint-600' : ''}>
        {selectedDates[0].getMonth() + 1}월 {selectedDates[0].getDate()}일
      </span>
      <span className={currentTab === 'time' ? 'text-mint-600' : ''}>
        {hours}:{minutes}
      </span>
      <span className={meridiem === 'PM' ? 'text-gray-500' : ''}>AM</span>
      <span className={meridiem === 'AM' ? 'text-gray-500' : ''}>PM</span>
    </div>
  );
};
