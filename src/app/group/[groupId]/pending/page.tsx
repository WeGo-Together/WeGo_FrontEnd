'use client';

import { use } from 'react';

import {
  GroupPendingHeader,
  GroupPendingMembers,
  GroupPendingSummary,
} from '@/components/pages/group';

interface Props {
  params: Promise<{ groupId: string }>;
}

const GroupPendingMembersPage = ({ params }: Props) => {
  const { groupId } = use(params);

  return (
    <>
      <GroupPendingHeader />
      <GroupPendingSummary />
      <GroupPendingMembers groupId={groupId} />
    </>
  );
};

export default GroupPendingMembersPage;
