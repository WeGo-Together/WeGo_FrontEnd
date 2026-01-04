'use client';

import { useRouter } from 'next/navigation';

import { RefObject } from 'react';

import { EmptyState } from '@/components/layout/empty-state';
import { ErrorMessage } from '@/components/shared';
import { Button } from '@/components/ui';
import { GroupListItemResponse } from '@/types/service/group';

import { EMPTY_STATE_CONFIG } from './constants';
import { MeetingCard } from './meeting-card';

type TabType = 'current' | 'myPost' | 'past';

const getModalType = (
  meeting: GroupListItemResponse,
  tabType: TabType,
): 'pending' | 'leave' | 'delete' => {
  if (tabType === 'myPost' || (tabType === 'current' && meeting.myMembership?.role === 'HOST')) {
    return 'delete';
  }
  if (tabType === 'current' && meeting.myMembership?.status === 'PENDING') {
    return 'pending';
  }
  return 'leave';
};

type MeetingListProps = {
  meetings: GroupListItemResponse[];
  tabType: TabType;
  emptyStateType: TabType;
  emptyStatePath: string;
  showActions: boolean;
  error?: Error | null;
  hasNextPage?: boolean;
  isLoading?: boolean;
  sentinelRef?: RefObject<HTMLDivElement | null>;
  completedMessage?: string;
};

const MIN_HEIGHT = 'min-h-[calc(100vh-156px)]';

export const MeetingList = ({
  meetings,
  tabType,
  emptyStateType,
  emptyStatePath,
  showActions,
  error,
  hasNextPage,
  isLoading,
  sentinelRef,
  completedMessage,
}: MeetingListProps) => {
  const router = useRouter();

  const isEmpty = meetings.length === 0;
  const hasError = !!error;
  const isLoadingState = !!isLoading;
  const showLoading = isEmpty && isLoadingState && !hasError;
  const showEmptyState = isEmpty && !hasError && !isLoadingState;
  const showErrorOnly = hasError && isEmpty;
  const showErrorWithData = hasError && !isEmpty;

  if (showLoading) {
    return (
      <div className={`flex ${MIN_HEIGHT} items-center justify-center py-8`}>
        <div className='text-gray-500'>로딩 중...</div>
      </div>
    );
  }

  if (showEmptyState) {
    const config = EMPTY_STATE_CONFIG[emptyStateType];
    const handleEmptyStateClick = () => router.push(emptyStatePath);

    return (
      <div className={`relative flex ${MIN_HEIGHT} flex-col items-center justify-center py-8`}>
        <EmptyState>{config.text}</EmptyState>

        <Button
          className={`bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700 relative z-10 mt-62.5 h-10 rounded-xl ${config.buttonWidth}`}
          onClick={handleEmptyStateClick}
        >
          {config.buttonText}
        </Button>
      </div>
    );
  }

  const handleRetry = () => window.location.reload();
  const getModalTypeForCard = (meeting: GroupListItemResponse) => getModalType(meeting, tabType);

  return (
    <section className='flex w-full flex-col gap-4 px-4 py-4'>
      {showErrorOnly && (
        <ErrorMessage className='py-12' message={error.message} onRetry={handleRetry} />
      )}

      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          getModalType={getModalTypeForCard}
          meeting={meeting}
          showActions={showActions}
          tabType={tabType}
        />
      ))}

      {showErrorWithData && (
        <ErrorMessage className='py-8' message={error.message} onRetry={handleRetry} />
      )}

      {hasNextPage && !hasError && sentinelRef && <div ref={sentinelRef} className='h-1' />}

      {!hasNextPage && !isEmpty && !hasError && completedMessage && (
        <div className='py-8 text-center text-gray-500'>{completedMessage}</div>
      )}
    </section>
  );
};
