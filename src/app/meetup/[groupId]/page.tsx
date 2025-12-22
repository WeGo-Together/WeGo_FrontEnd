'use client';

import { use } from 'react';

import {
  MeetupBannerImages,
  MeetupButtons,
  MeetupDescriptions,
  MeetupMembers,
} from '@/components/pages/meetup';
import { useGetGroupDetails } from '@/hooks/use-group/use-group-get-details';

interface Props {
  params: Promise<{ groupId: string }>;
}

const MeetupDetailPage = ({ params }: Props) => {
  const { groupId } = use(params);
  const { data } = useGetGroupDetails({ groupId });

  console.log(data);

  if (!data) return null;

  const { images, status, myMembership, joinedMembers, participantCount, maxParticipants } = data;

  return (
    <div>
      <MeetupBannerImages images={images} />
      <MeetupDescriptions descriptions={data} />
      <MeetupMembers members={joinedMembers} />
      <MeetupButtons
        conditions={{
          isHost: myMembership?.role === 'HOST',
          isJoined: myMembership?.status === 'ATTEND',
          isPast: status === 'FINISHED',
          isAttendDisabled: participantCount >= maxParticipants || status === 'FINISHED',
        }}
        groupId={groupId}
      />
    </div>
  );
};

export default MeetupDetailPage;
