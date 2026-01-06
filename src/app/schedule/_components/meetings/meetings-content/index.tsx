import { GroupListItemResponse } from '@/types/service/group';

import { ScheduleCard } from '../../card';
import { type TabType } from '../constants';

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

interface MeetingsContentProps {
  meetings: GroupListItemResponse[];
  tabType: TabType;
  showActions: boolean;
}

export const MeetingsContent = ({ meetings, tabType, showActions }: MeetingsContentProps) => {
  return (
    <div className='flex w-full flex-col gap-4' aria-label='모임 목록' role='list'>
      {meetings.map((meeting) => {
        const groupId = String(meeting.id);
        const myMembership = meeting.myMembership;
        const isPending = myMembership?.status === 'PENDING';
        const isFinished = meeting.status === 'FINISHED';
        const isHost = myMembership?.role === 'HOST';
        const createdBy = meeting.createdBy;
        const shouldFetchChatRoomId = showActions && !isPending && !isFinished;

        return (
          <ScheduleCard
            key={meeting.id}
            createdBy={createdBy}
            groupId={groupId}
            isFinished={isFinished}
            isHost={isHost}
            isPending={isPending}
            joinPolicy={meeting.joinPolicy}
            meeting={meeting}
            modalType={getModalType(meeting, tabType)}
            shouldFetchChatRoomId={shouldFetchChatRoomId}
            showActions={showActions}
            tabType={tabType}
          />
        );
      })}
    </div>
  );
};
