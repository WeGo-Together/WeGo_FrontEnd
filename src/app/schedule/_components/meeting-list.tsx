'use client';

import { useRouter } from 'next/navigation';

import { RefObject } from 'react';

import { EmptyState } from '@/components/layout/empty-state';
import { ErrorMessage } from '@/components/shared';
import Card from '@/components/shared/card';
import { Button } from '@/components/ui';
import { formatDateTime } from '@/lib/formatDateTime';
import { GroupListItemResponse } from '@/types/service/group';

type TabType = 'current' | 'myPost' | 'past';

const EMPTY_STATE_CONFIG = {
  current: {
    text: (
      <>
        현재 참여 중인 모임이 없어요.
        <br />
        지금 바로 모임을 참여해보세요!
      </>
    ),
    buttonText: '모임 보러가기',
    buttonWidth: 'w-31',
  },
  myPost: {
    text: (
      <>
        아직 생성한 모임이 없어요.
        <br />
        지금 바로 모임을 만들어보세요!
      </>
    ),
    buttonText: '모임 만들기',
    buttonWidth: 'w-31',
  },
  past: {
    text: (
      <>
        아직 참여한 모임이 없어요.
        <br />
        마음에 드는 모임을 발견해보세요!
      </>
    ),
    buttonText: '모임 보러가기',
    buttonWidth: 'w-31',
  },
} as const;

type MeetingListProps = {
  meetings: GroupListItemResponse[];
  tabType: TabType;
  emptyStateType: TabType;
  emptyStatePath: string;
  showActions: boolean;
  leaveActionText?: string;
  error?: Error | null;
  hasNextPage?: boolean;
  sentinelRef?: RefObject<HTMLDivElement | null>;
  completedMessage?: string;
};

export const MeetingList = ({
  meetings,
  tabType,
  emptyStateType,
  emptyStatePath,
  showActions,
  leaveActionText,
  error,
  hasNextPage,
  sentinelRef,
  completedMessage,
}: MeetingListProps) => {
  const router = useRouter();

  if (meetings.length === 0 && !error) {
    const config = EMPTY_STATE_CONFIG[emptyStateType];
    return (
      <div className='relative flex min-h-[calc(100vh-156px)] flex-col items-center justify-center py-8'>
        <EmptyState>{config.text}</EmptyState>

        <Button
          className={`bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700 relative z-10 mt-62.5 h-10 rounded-xl ${config.buttonWidth}`}
          onClick={() => router.push(emptyStatePath)}
        >
          {config.buttonText}
        </Button>
      </div>
    );
  }

  return (
    <section className='flex w-full flex-col gap-4 px-4 py-4'>
      {error && meetings.length === 0 && (
        <ErrorMessage
          className='py-12'
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      )}

      {meetings.map((meeting) => (
        <Card
          key={meeting.id}
          dateTime={formatDateTime(meeting.startTime)}
          images={meeting.images}
          leaveAndChatActions={
            showActions
              ? {
                  onLeave: () => console.log(leaveActionText || '모임 탈퇴', meeting.id),
                  onChat: () => router.push(`/chat/${meeting.id}`),
                }
              : undefined
          }
          location={meeting.location}
          maxParticipants={meeting.maxParticipants}
          nickName={meeting.createdBy.nickName}
          participantCount={meeting.participantCount}
          profileImage={meeting.createdBy.profileImage}
          tabType={tabType}
          tags={meeting.tags}
          title={meeting.title}
          onClick={() => router.push(`/group/${meeting.id}`)}
        />
      ))}

      {error && meetings.length > 0 && (
        <ErrorMessage
          className='py-8'
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      )}

      {hasNextPage && !error && sentinelRef && <div ref={sentinelRef} className='h-1' />}

      {!hasNextPage && meetings.length > 0 && !error && completedMessage && (
        <div className='py-8 text-center text-gray-500'>{completedMessage}</div>
      )}
    </section>
  );
};

//
