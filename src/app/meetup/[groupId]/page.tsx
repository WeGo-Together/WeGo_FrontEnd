'use client';

import { use, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

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
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isPast, setIsPast] = useState<boolean>(false);
  const { groupId } = use(params);
  const { data } = useGetGroupDetails({ groupId });

  useEffect(() => {
    if (!data) return;

    const { createdBy, startTime } = data;

    const sessionId = Number(Cookies.get('userId'));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHost(sessionId === createdBy.userId);

    setIsPast(() => {
      if (new Date(startTime) < new Date()) return true;
      return false;
    });
  }, [data]);

  console.log(data);

  if (!data) return null;

  const {
    images,
    joinedMembers,
    userStatus: { isJoined },
    participantCount,
    maxParticipants,
  } = data;

  return (
    <div>
      <MeetupBannerImages images={images} />
      <MeetupDescriptions conditions={{ isHost, isPast }} descriptions={data} />
      <MeetupMembers members={joinedMembers} />
      <MeetupButtons
        conditions={{
          isHost,
          isJoined,
          isPast,
          isAttendDisabled: participantCount >= maxParticipants || isPast,
        }}
        groupId={groupId}
      />
    </div>
  );
};

export default MeetupDetailPage;
