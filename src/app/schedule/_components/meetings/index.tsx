'use client';

import { type RefObject } from 'react';

import { ErrorMessage } from '@/components/shared';
import { GroupListItemResponse } from '@/types/service/group';

import { type TabType } from './constants';
import { MeetingsContent } from './meetings-content';
import { MeetingsEmpty } from './meetings-empty';
import { MeetingsInfiniteScroll } from './meetings-infinite-scroll';
import { MeetingsLoading } from './meetings-loading';

type MeetingsProps = {
  meetings: GroupListItemResponse[];
  tabType: TabType;
  emptyStateType: TabType;
  emptyStatePath: string;
  showActions: boolean;
  error?: Error | null;
  hasNextPage?: boolean;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  sentinelRef?: RefObject<HTMLDivElement | null>;
  completedMessage?: string;
  refetch?: () => Promise<unknown>;
};

export const Meetings = ({
  meetings,
  tabType,
  emptyStateType,
  emptyStatePath,
  showActions,
  error,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  sentinelRef,
  completedMessage,
  refetch,
}: MeetingsProps) => {
  const isEmpty = meetings.length === 0;
  const hasError = !!error;
  const hasItems = meetings.length > 0;
  const hasNoItems = isEmpty && !error && !isLoading;
  const showErrorOnly = hasError && isEmpty;
  const showErrorWithData = hasError && !isEmpty;
  const showEmptyState = hasNoItems;

  const handleRetry = () => {
    if (refetch) {
      refetch();
    } else {
      window.location.reload();
    }
  };

  if (isLoading) {
    return <MeetingsLoading />;
  }

  return (
    <>
      {showEmptyState && (
        <MeetingsEmpty emptyStatePath={emptyStatePath} emptyStateType={emptyStateType} />
      )}

      {hasItems && (
        <section className='flex w-full flex-col gap-4 px-4 py-4'>
          {showErrorOnly && (
            <div className='py-4'>
              <ErrorMessage className='py-12' message={error.message} onRetry={handleRetry} />
            </div>
          )}

          <MeetingsContent meetings={meetings} showActions={showActions} tabType={tabType} />

          {showErrorWithData && (
            <div className='py-4'>
              <ErrorMessage className='py-8' message={error.message} onRetry={handleRetry} />
            </div>
          )}

          <MeetingsInfiniteScroll
            completedMessage={completedMessage || ''}
            hasError={hasError}
            hasNextPage={hasNextPage || false}
            isFetchingNextPage={isFetchingNextPage || false}
            sentinelRef={sentinelRef}
          />
        </section>
      )}
    </>
  );
};
