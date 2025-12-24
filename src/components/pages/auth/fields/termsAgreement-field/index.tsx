'use client';

import { type AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { useModal } from '@/components/ui';
import { cn } from '@/lib/utils';

import { SignupAgreementModal } from '../../signup/signup-agreement-modal';

interface Props {
  field: AnyFieldApi;
}

export const TermsAgreementField = ({ field }: Props) => {
  const { open } = useModal();
  const checked = Boolean(field.state.value);

  return (
    <div className='flex w-full items-center justify-between'>
      <label className='flex-center cursor-pointer'>
        <input
          className='peer sr-only'
          checked={checked}
          name={field.name}
          type='checkbox'
          onChange={(e) => field.handleChange(e.target.checked)}
        />
        <Icon id='check' className={cn(checked ? 'text-mint-500' : 'text-gray-500')} />
        <span className='text-text-sm-medium text-gray-700'>서비스 이용약관에 동의합니다.</span>
      </label>

      <button
        className='text-text-sm-medium text-gray-500 underline'
        type='button'
        onClick={() => open(<SignupAgreementModal />)}
      >
        보기
      </button>
    </div>
  );
};
