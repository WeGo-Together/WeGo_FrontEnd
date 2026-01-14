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

interface Props {
  createdBy: GroupListItemResponse['createdBy'];
  groupId: string;
  isFinished: boolean;
  isHost: boolean;
  isPending: boolean;
  joinPolicy: GroupListItemResponse['joinPolicy'];
  group: GroupListItemResponse;
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
  group,
  modalType,
  shouldFetchChatRoomId,
  showActions,
  tabType,
}: Props) => {
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
      dateTime={formatDateTime(group.startTime)}
      images={group.images}
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
      location={group.location}
      maxParticipants={group.maxParticipants}
      nickName={createdBy.nickName}
      participantCount={group.participantCount}
      profileImage={createdBy.profileImage}
      tabType={tabType}
      tags={group.tags}
      title={group.title}
      onClick={handleCardClick}
    />
  );
};
