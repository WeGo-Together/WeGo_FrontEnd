'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

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
    <div>
      <h2 className='text-gray-700'>문제가 발생했습니다</h2>
      <button className='text-gray-700' onClick={() => reset()}>
        다시 시도
      </button>
    </div>
  );
}
