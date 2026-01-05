'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { GroupModal } from '@/components/pages/group/group-modal';
import CardComponent from '@/components/shared/card';
import { useModal } from '@/components/ui';
import { formatDateTime } from '@/lib/formatDateTime';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupListItemResponse } from '@/types/service/group';

type TabType = 'current' | 'myPost' | 'past';

interface ScheduleCardProps {
  createdBy: GroupListItemResponse['createdBy'];
  groupId: string;
  isFinished: boolean;
  isHost: boolean;
  isPending: boolean;
  joinPolicy: GroupListItemResponse['joinPolicy'];
  meeting: GroupListItemResponse;
  modalType: 'pending' | 'leave' | 'delete';
  shouldFetchChatRoomId: boolean;
  showActions: boolean;
  tabType: TabType;
}

export const ScheduleCard = ({
  createdBy,
  groupId,
  isFinished,
  isHost,
  isPending,
  joinPolicy,
  meeting,
  modalType,
  shouldFetchChatRoomId,
  showActions,
  tabType,
}: ScheduleCardProps) => {
  const router = useRouter();
  const { open } = useModal();

  const { data: groupDetails } = useQuery({
    queryKey: groupKeys.detail(groupId),
    queryFn: () => API.groupService.getGroupDetails({ groupId }),
    enabled: shouldFetchChatRoomId,
  });

  const handleChatClick = () => {
    if (!groupDetails?.chatRoomId) return;
    router.push(`/message/chat/${groupDetails.chatRoomId}`);
  };

  const handleLeaveClick = () => {
    open(<GroupModal groupId={groupId} type={modalType} />);
  };

  const handleCardClick = () => {
    router.push(`/group/${groupId}`);
  };

  return (
    <CardComponent
      dateTime={formatDateTime(meeting.startTime)}
      images={meeting.images}
      isFinished={isFinished}
      isHost={isHost}
      isPending={isPending}
      joinPolicy={joinPolicy}
      leaveAndChatActions={
        showActions
          ? {
              onLeave: handleLeaveClick,
              onChat: handleChatClick,
            }
          : undefined
      }
      location={meeting.location}
      maxParticipants={meeting.maxParticipants}
      nickName={createdBy.nickName}
      participantCount={meeting.participantCount}
      profileImage={createdBy.profileImage}
      tabType={tabType}
      tags={meeting.tags}
      title={meeting.title}
      onClick={handleCardClick}
    />
  );
};
