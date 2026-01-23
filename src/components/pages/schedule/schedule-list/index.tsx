'use client';

import { type RefObject } from 'react';

import {
  ScheduleListContent,
  ScheduleListEmpty,
  ScheduleListInfiniteScroll,
} from '@/components/pages/schedule';
import { ErrorMessage } from '@/components/shared';
import { GroupListItemResponse } from '@/types/service/group';

import { type TabType } from './constants';

type Props = {
  group: GroupListItemResponse[];
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

export const ScheduleList = ({
  group,
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
}: Props) => {
  const isEmpty = group.length === 0;
  const hasError = !!error;
  const hasItems = group.length > 0;
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

  return (
    <>
      {showEmptyState && (
        <ScheduleListEmpty emptyStatePath={emptyStatePath} emptyStateType={emptyStateType} />
      )}

      {hasItems && (
        <section className='flex w-full flex-col gap-4 px-4 py-4'>
          {showErrorOnly && (
            <div className='py-4'>
              <ErrorMessage className='py-12' message={error.message} onRetry={handleRetry} />
            </div>
          )}

          <ScheduleListContent group={group} showActions={showActions} tabType={tabType} />

          {showErrorWithData && (
            <div className='py-4'>
              <ErrorMessage className='py-8' message={error.message} onRetry={handleRetry} />
            </div>
          )}

          <ScheduleListInfiniteScroll
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
