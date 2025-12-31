'use client';

import { use } from 'react';

import {
  GroupBannerImages,
  GroupButtons,
  GroupDescriptions,
  GroupMembers,
} from '@/components/pages/group';
import { useGetGroupDetails } from '@/hooks/use-group/use-group-get-details';

interface Props {
  params: Promise<{ groupId: string }>;
}

const GroupDetailPage = ({ params }: Props) => {
  const { groupId } = use(params);
  const { data } = useGetGroupDetails({ groupId });

  console.log(data);

  if (!data) return null;

  const {
    images,
    status,
    joinPolicy,
    myMembership,
    joinedMembers,
    participantCount,
    maxParticipants,
  } = data;

  return (
    <div>
      <GroupBannerImages images={images} />
      <GroupDescriptions descriptions={data} />
      <GroupMembers isHost={myMembership?.role === 'HOST'} members={joinedMembers} />
      <GroupButtons
        conditions={{
          isHost: myMembership?.role === 'HOST',
          isJoined: myMembership?.status === 'ATTEND',
          isPast: status === 'FINISHED',
          isPending: myMembership?.status === 'PENDING',
          isFreeGroup: joinPolicy === 'FREE',
          isAttendDisabled: participantCount >= maxParticipants || status === 'FINISHED',
        }}
      />
    </div>
  );
};

export default GroupDetailPage;
