'use client';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui';

export default function NotFound() {
  const router = useRouter();

  const handleHomeButtonClick = () => {
    router.push('/');
  };

  return (
    <div className='flex-col-center absolute inset-0'>
      <Icon id='not-found' className='mb-2 size-35' />
      <h2 className='text-text-sm-medium mb-4.5 text-gray-600'>페이지가 존재하지 않습니다.</h2>
      <Button className='w-21.25' size='sm' onClick={handleHomeButtonClick}>
        홈으로
      </Button>
    </div>
  );
}
