'use client';

import { useRouter } from 'next/navigation';

import Card from '@/components/shared/card';

import { EmptyState } from './empty-state';
import type { Meeting, TabType } from './types';

type MeetingListProps = {
  meetings: Meeting[];
  tabType: TabType;
  emptyStateType: TabType;
  emptyStatePath: string;
  showActions: boolean;
  leaveActionText?: string;
};

export const MeetingList = ({
  meetings,
  tabType,
  emptyStateType,
  emptyStatePath,
  showActions,
  leaveActionText,
}: MeetingListProps) => {
  const router = useRouter();

  if (meetings.length === 0) {
    return <EmptyState type={emptyStateType} onButtonClick={() => router.push(emptyStatePath)} />;
  }

  return (
    <section className='flex w-full flex-col gap-4 px-4 py-4'>
      {meetings.map((meeting) => (
        <Card
          key={meeting.id}
          dateTime={meeting.dateTime}
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
          nickName={meeting.nickName}
          participantCount={meeting.participantCount}
          tabType={tabType}
          tags={meeting.tags}
          title={meeting.title}
          onClick={() => router.push(`/meetup/${meeting.id}`)}
        />
      ))}
    </section>
  );
};
