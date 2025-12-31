'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { LocationSearchModal } from '@/components/pages/create-group/modals/location-search-modal';
import { Hint, Label } from '@/components/ui';
import { useModal } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const GroupLocationField = ({ field }: Props) => {
  const { open } = useModal();

  const onInputClick = () => {
    open(<LocationSearchModal LocationField={field} />);
  };

  const hasValue = field.state.value;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className='mt-3 flex w-full flex-col gap-1'>
      <Label htmlFor='create-group-location' required onClick={onInputClick}>
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
            'text-text-md-medium text-left text-gray-500 select-none',
            field.state.value && 'text-gray-800',
          )}
        >
          {hasValue ? field.state.value : <span>모임 장소를 입력해주세요</span>}
        </p>
      </button>
      {isInvalid && <Hint className='mt-0.5' message={field.state.meta.errors[0].message} />}
    </div>
  );
};
