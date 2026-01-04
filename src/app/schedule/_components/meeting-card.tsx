'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { GroupModal } from '@/components/pages/group/group-modal';
import Card from '@/components/shared/card';
import { useModal } from '@/components/ui';
import { formatDateTime } from '@/lib/formatDateTime';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupListItemResponse } from '@/types/service/group';

type TabType = 'current' | 'myPost' | 'past';

interface MeetingCardProps {
  getModalType: (meeting: GroupListItemResponse) => 'pending' | 'leave' | 'delete';
  meeting: GroupListItemResponse;
  showActions: boolean;
  tabType: TabType;
}

/**
 * 모임 상세 페이지에서 chatRoomId를 가져와 채팅 입장할거임
 */
export const MeetingCard = ({ getModalType, meeting, showActions, tabType }: MeetingCardProps) => {
  const router = useRouter();
  const { open } = useModal();

  const groupId = String(meeting.id);
  const myMembership = meeting.myMembership;
  const isPending = myMembership?.status === 'PENDING';
  const isFinished = meeting.status === 'FINISHED';
  const isHost = myMembership?.role === 'HOST';
  const createdBy = meeting.createdBy;

  const shouldFetchChatRoomId = showActions && !isPending && !isFinished;

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
    const modalType = getModalType(meeting);
    open(<GroupModal groupId={groupId} type={modalType} />);
  };

  const handleCardClick = () => {
    router.push(`/group/${groupId}`);
  };

  return (
    <Card
      dateTime={formatDateTime(meeting.startTime)}
      images={meeting.images}
      isFinished={isFinished}
      isHost={isHost}
      isPending={isPending}
      joinPolicy={meeting.joinPolicy}
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
