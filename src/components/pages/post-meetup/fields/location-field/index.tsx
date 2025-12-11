'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { LocationSearchModal } from '@/components/pages/post-meetup/modals/location-search-modal';
import { Label } from '@/components/ui';
import { useModal } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupLocationField = ({ field }: Props) => {
  const { open } = useModal();

  const onInputClick = () => {
    open(<LocationSearchModal LocationField={field} />);
  };

  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-location' required onClick={onInputClick}>
        모임 장소
      </Label>
      <button
        className='bg-mono-white focus:border-mint-500 relative cursor-pointer rounded-2xl border border-gray-300 p-4 pl-11 focus:outline-none'
        type='button'
        onClick={onInputClick}
      >
        <Icon
          id='map-pin-1'
          width={20}
          className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
          height={20}
        />
        <p
          className={clsx(
            'text-text-md-medium text-left text-gray-500',
            field.state.value && 'text-gray-800',
          )}
        >
          {field.state.value ? field.state.value : '모임 장소를 입력해주세요'}
        </p>
      </button>
    </div>
  );
};
