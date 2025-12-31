'use client';

import { useCallback } from 'react';

import { EmptyState } from '@/components/layout/empty-state';
import { GetPendingMembersResponse } from '@/types/service/group';

import { PendingMemberCard } from './pending-member-card';

interface Props {
  groupId: string;
  pendingMembers?: GetPendingMembersResponse['pendingMembers'];
}

const MOCK_PENDING_MEMBERS: GetPendingMembersResponse['pendingMembers'] = [
  {
    userId: 101,
    groupUserId: 1,
    nickName: 'Hope Lee',
    profileImage: null,
    profileMessage: 'Here We Go Again :)',
    requestMessage: '안녕하세요 함께하고 싶습니다!',
    requestedAt: '2025-12-24T13:20:10.123456',
  },
  {
    userId: 102,
    groupUserId: 2,
    nickName: '바다소년',
    profileImage: null,
    profileMessage: '물고기를 좋아합니다.',
    requestMessage: '보드게임 정말 좋아해서 신청합니다! 앞으로 잘 부탁드려요',
    requestedAt: '2025-12-24T13:25:15.789012',
  },
  {
    userId: 103,
    groupUserId: 3,
    nickName: '박디자인',
    profileImage: null,
    profileMessage: 'UI/UX 디자이너',
    requestMessage: null,
    requestedAt: '2025-12-24T13:30:20.456789',
  },
];

export const GroupPendingMembers = ({ groupId, pendingMembers = MOCK_PENDING_MEMBERS }: Props) => {
  const handleReject = useCallback(
    (memberId: number) => {
      console.log('거절:', groupId, memberId);
    },
    [groupId],
  );

  const handleApprove = useCallback(
    (memberId: number) => {
      console.log('승인:', groupId, memberId);
    },
    [groupId],
  );

  if (pendingMembers?.length === 0) {
    return (
      <section className='relative h-[calc(100vh-192px)]'>
        <EmptyState>승인 대기 중인 멤버가 없습니다</EmptyState>
      </section>
    );
  }

  return (
    <section className='mt-5 px-4 pb-5'>
      <ul className='space-y-4'>
        {pendingMembers.map((member) => (
          <li key={member.groupUserId}>
            <PendingMemberCard
              member={member}
              onApprove={() => handleApprove(member.groupUserId)}
              onReject={() => handleReject(member.groupUserId)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
