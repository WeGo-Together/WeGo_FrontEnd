'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className='flex-col-center absolute inset-0'>
      <Icon id='empty' className='mb-2 size-35' />
      <h2 className='text-text-sm-medium flex-col-center mb-4.5 text-gray-600'>
        <span>요청을 처리하는데 실패했습니다.</span>
        <span>잠시후 다시 시도해주세요.</span>
      </h2>
      <Button className='w-21.25' size='sm' onClick={reset}>
        다시 시도
      </Button>
    </div>
  );
}
