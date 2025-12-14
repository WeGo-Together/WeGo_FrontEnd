'use client';

import { useState } from 'react';

import { AnyFieldApi } from '@tanstack/react-form';
import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { Calendar } from '@/components/pages/post-meetup/modals/date-picker-modal/calendar';
import { Button, ModalContent, ModalTitle, useModal } from '@/components/ui';

interface Props {
  dateField: AnyFieldApi;
}

export const DatePickerModal = ({ dateField }: Props) => {
  const { close } = useModal();
  const [tabMenu, setTabMenu] = useState<'date' | 'time'>('date');

  return (
    <ModalContent className='w-82.5'>
      <ModalTitle>날짜 및 시간</ModalTitle>
      <section className='mt-2'>
        <nav className='flex'>
          {DATE_MODAL_TAB_MENU.map(({ name, iconId }) => (
            <button
              key={name}
              className={clsx(
                'flex-center h-12 grow-1 border-b-2 border-gray-200 transition-colors duration-300',
                tabMenu === name && 'border-mint-500',
              )}
              type='button'
              onClick={() => setTabMenu(name)}
            >
              <Icon
                id={iconId}
                className={clsx('text-gray-500', tabMenu === name && 'text-mint-500')}
              />
            </button>
          ))}
        </nav>

        <Calendar
          currentTab={tabMenu}
          dateFieldValue={dateField.state.value}
          updateDateField={(selectedDate: string) => dateField.handleChange(selectedDate)}
        />

        <div className='mt-5'>
          <Button className='text-text-md-bold bg-mint-400' onClick={close}>
            확인
          </Button>
        </div>
      </section>
    </ModalContent>
  );
};

const DATE_MODAL_TAB_MENU = [
  { name: 'date', iconId: 'calendar-1' },
  { name: 'time', iconId: 'clock' },
] as const;
