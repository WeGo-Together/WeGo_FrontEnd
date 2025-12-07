'use client';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { Input, Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const MeetupTagsField = ({ field }: Props) => {
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
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <ul className='mt-0.5 flex flex-wrap px-2'>
        <li className='bg-mint-100 text-mint-700 flex-center gap-0.5 rounded-full px-2 py-0.5'>
          <p className='text-text-xs-medium'>#태그</p>
          <Icon id='small-x-1' width={7} height={7} />
        </li>
      </ul>
    </div>
  );
};
