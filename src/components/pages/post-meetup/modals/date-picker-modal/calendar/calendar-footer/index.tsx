import { useContextCalendars, useContextDays } from '@rehookify/datepicker';

interface Props {
  currentTab: 'date' | 'time';
}

export const CalendarFooter = ({ currentTab }: Props) => {
  const { calendars } = useContextCalendars();
  const { selectedDates } = useContextDays();

  const { year, month } = calendars[0];

  return (
    <div className='text-text-md-semibold flex-center mt-3 flex-wrap gap-2.5 text-gray-700'>
      <span>{year}년</span>
      <span className={currentTab === 'date' ? 'text-mint-600' : ''}>
        {month}월 {selectedDates[0].getDate()}일
      </span>
      <span className={currentTab === 'time' ? 'text-mint-600' : ''}>12:20</span>
      <span>AM</span>
      <span>PM</span>
    </div>
  );
};
