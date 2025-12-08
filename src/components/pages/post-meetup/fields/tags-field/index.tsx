'use client';

import { useState } from 'react';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupTagsField = ({ field }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;

    const hasDupe = field.state.value.includes(inputValue);

    if (!hasDupe && inputValue.trim()) field.pushValue(inputValue);

    setInputValue('');
  };

  return (
    <div className='flex w-full flex-col gap-1'>
      <Label htmlFor='post-meetup-tags'>태그</Label>
      <Input
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
        placeholder='입력 후 Enter'
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onEnter}
      />
      <ul className='mt-0.5 flex flex-wrap gap-x-1 gap-y-1.5 px-2'>
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
    </div>
  );
};
