'use client';

import { useState } from 'react';

import { AnyFieldApi } from '@tanstack/react-form';
import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { Calendar } from '@/components/pages/post-meetup/modals/date-picker-modal/calendar';
import { ModalContent, ModalTitle } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const DatePickerModal = ({ field }: Props) => {
  const [tabMenu, setTabMenu] = useState<'date' | 'time'>('date');

  return (
    <ModalContent>
      <ModalTitle>모달임</ModalTitle>
      <section className=''>
        <nav className='flex'>
          {DATE_MODAL_TAB_MENU.map(({ name, iconId }) => (
            <button
              key={name}
              className={clsx(
                'flex-center h-12 grow-1 border-b-2 border-gray-200',
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
          handleDateChange={(selectedDate: string) =>
            field.handleChange({ ...field.state.value, selectedDate })
          }
        />

        <div className='flex-center mt-6 gap-2'>
          <button
            className='text-text-md-semibold grow-1 rounded-2xl border-1 border-gray-400 bg-white py-3.25 text-gray-600'
            type='button'
            onClick={close}
          >
            취소
          </button>
          <button className='text-text-md-bold bg-mint-400 grow-1 rounded-2xl py-3.5 text-white disabled:bg-gray-500'>
            확인
          </button>
        </div>
      </section>
    </ModalContent>
  );
};

const DATE_MODAL_TAB_MENU = [
  { name: 'date', iconId: 'calendar-1' },
  { name: 'time', iconId: 'clock' },
] as const;
