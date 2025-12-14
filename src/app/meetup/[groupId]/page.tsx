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

  if (!data) return null;

  console.log(data);

  return (
    <div>
      <MeetupBannerImages images={data.images} />
      <MeetupDescriptions descriptions={data} />
      <MeetupMembers members={data.joinedMembers} />
      <MeetupButtons conditions={data} />
    </div>
  );
};

export default MeetupDetailPage;
