import { redirect } from 'next/navigation';

import { Suspense } from 'react';

import { API } from '@/api';
import {
  GroupPendingHeader,
  GroupPendingMembers,
  GroupPendingSummary,
} from '@/components/pages/pending';
import { PendingMembersLoading } from '@/components/pages/pending/pending-members/pending-members-loading';
import { GetJoinRequestsResponse, GroupUserV2Status } from '@/types/service/group';

interface Props {
  params: Promise<{ groupId: string }>;
}

const PENDING_STATUS: GroupUserV2Status = 'PENDING';

/**
 * 가입 신청 목록 조회 페이지
 */
export default async function PendingMembersPage({ params }: Props) {
  const { groupId } = await params;

  let joinRequestsData: GetJoinRequestsResponse;

  try {
    joinRequestsData = await API.groupService.getJoinRequests({ groupId }, PENDING_STATUS);
  } catch {
    redirect('/');
  }

  return (
    <>
      <GroupPendingHeader />
      <GroupPendingSummary groupId={groupId} initialData={joinRequestsData} />
      <Suspense fallback={<PendingMembersLoading />}>
        <GroupPendingMembers groupId={groupId} />
      </Suspense>
    </>
  );
}
