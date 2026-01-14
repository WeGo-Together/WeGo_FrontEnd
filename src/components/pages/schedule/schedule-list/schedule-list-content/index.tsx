import { GroupListItemResponse } from '@/types/service/group';

import { type TabType } from '../constants';
import { ScheduleCard } from './schedule-card/card';

interface Props {
  group: GroupListItemResponse[];
  tabType: TabType;
  showActions: boolean;
}

export const ScheduleListContent = ({ group, tabType, showActions }: Props) => {
  return (
    <div className='flex w-full flex-col gap-4' aria-label='모임 목록' role='list'>
      {group.map((group) => {
        const groupId = String(group.id);
        const myMembership = group.myMembership;
        const isPending = myMembership?.status === 'PENDING';
        const isFinished = group.status === 'FINISHED';
        const isHost = myMembership?.role === 'HOST';
        const createdBy = group.createdBy;
        const shouldFetchChatRoomId = showActions && !isPending && !isFinished;

        return (
          <ScheduleCard
            key={group.id}
            createdBy={createdBy}
            group={group}
            groupId={groupId}
            isFinished={isFinished}
            isHost={isHost}
            isPending={isPending}
            joinPolicy={group.joinPolicy}
            modalType={getModalType(group, tabType)}
            shouldFetchChatRoomId={shouldFetchChatRoomId}
            showActions={showActions}
            tabType={tabType}
          />
        );
      })}
    </div>
  );
};

const getModalType = (
  group: GroupListItemResponse,
  tabType: TabType,
): 'pending' | 'leave' | 'delete' => {
  if (tabType === 'myPost' || (tabType === 'current' && group.myMembership?.role === 'HOST')) {
    return 'delete';
  }
  if (tabType === 'current' && group.myMembership?.status === 'PENDING') {
    return 'pending';
  }
  return 'leave';
};
