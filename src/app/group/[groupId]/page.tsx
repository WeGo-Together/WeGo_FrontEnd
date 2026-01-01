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

  const { images, status, joinPolicy, myMembership, joinedMembers } = data;

  return (
    <div>
      <GroupBannerImages images={images} />
      <GroupDescriptions descriptions={data} />
      <GroupMembers isHost={myMembership?.role === 'HOST'} members={joinedMembers} />
      <GroupButtons statuses={{ status, myMembership, joinPolicy }} />
    </div>
  );
};

export default GroupDetailPage;
