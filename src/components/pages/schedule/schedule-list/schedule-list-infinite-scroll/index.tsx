import { type RefObject } from 'react';

interface Props {
  sentinelRef?: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  completedMessage: string;
  hasError: boolean;
}

export const ScheduleListInfiniteScroll = ({
  sentinelRef,
  hasNextPage,
  isFetchingNextPage,
  completedMessage,
  hasError,
}: Props) => {
  if (hasNextPage && !hasError) {
    return (
      <>
        {sentinelRef && <div ref={sentinelRef} aria-hidden='true' className='h-1' />}
        {isFetchingNextPage && (
          <div
            className='py-8 text-center text-gray-500'
            aria-label='더 많은 모임을 불러오는 중입니다'
            aria-live='polite'
            role='status'
          >
            <div className='flex items-center justify-center gap-2'>
              <div className='border-t-mint-500 h-5 w-5 animate-spin rounded-full border-2 border-gray-300' />
              <span>더 많은 모임을 불러오는 중...</span>
            </div>
          </div>
        )}
      </>
    );
  }

  if (!hasNextPage && !hasError) {
    return (
      <div className='py-8 text-center text-gray-500' aria-live='polite' role='status'>
        {completedMessage}
      </div>
    );
  }

  return null;
};
