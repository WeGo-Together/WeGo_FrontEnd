'use client';

import { useRef, useState } from 'react';

import { AnyFieldApi } from '@tanstack/react-form';
import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { Hint, Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupTagsField = ({ field }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    if (e.nativeEvent.isComposing) return;

    const isUniqueTag = !field.state.value.includes(inputValue);
    const isValidTag = inputValue.trim() && inputValue.length <= 8;
    const isBelowMaxLength = field.state.value.length < 10;

    if (isUniqueTag && isValidTag && isBelowMaxLength) {
      field.pushValue(inputValue);
    }

    inputRef.current?.focus();
    setInputValue('');
  };

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className='flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-tags'>태그</Label>
      <Input
        ref={inputRef}
        id='post-meetup-tags'
        className='bg-mono-white focus:border-mint-500 rounded-2xl border border-gray-300'
        frontIcon={
          <Icon
            id='tag'
            width={20}
            className='pointer-events-none absolute top-0 left-4 flex h-full items-center text-gray-500'
            height={20}
          />
        }
        maxLength={8}
        placeholder='입력 후 Enter'
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onEnter}
      />

      <ul
        className={clsx(
          'mt-0.5 flex flex-wrap gap-x-1 gap-y-1.5 px-2',
          field.state.value.length ? 'block' : 'hidden',
        )}
      >
        {field.state.value.map((tag: string, idx: number) => (
          <li
            key={tag}
            className='bg-mint-100 text-mint-700 flex-center cursor-pointer gap-0.5 rounded-full px-2 py-0.5'
            onClick={() => field.removeValue(idx)}
          >
            <p className='text-text-xs-medium'>#{tag}</p>
            <Icon id='small-x-2' width={10} height={10} />
          </li>
        ))}
      </ul>

      <p className='text-text-sm-medium px-2 text-gray-500'>최대 10개까지 업로드할 수 있어요.</p>
      {isInvalid && <Hint className='mt-0.5' message={field.state.meta.errors[0].message} />}
    </div>
  );
};
