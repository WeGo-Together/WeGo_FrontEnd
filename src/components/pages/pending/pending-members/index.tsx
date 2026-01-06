'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useEffect, useMemo } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { EmptyState } from '@/components/layout/empty-state';
import { Toast } from '@/components/ui';
import { useToast } from '@/components/ui/toast/core';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GetJoinRequestsResponse } from '@/types/service/group';

import { PENDING_MEMBERS_MIN_HEIGHT } from './constants';
import { PendingMemberCard } from './pending-member-card';
import { PendingMembersSkeleton } from './pending-members-loading';

interface Props {
  groupId: string;
}

export const GroupPendingMembers = ({ groupId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { run } = useToast();

  const { data, isLoading, error } = useQuery<GetJoinRequestsResponse>({
    queryKey: groupKeys.joinRequests(groupId, 'PENDING'),
    queryFn: () => API.groupService.getJoinRequests({ groupId }, 'PENDING'),
  });

  const isForbidden = useMemo(
    () => error && typeof error === 'object' && 'status' in error && error.status === 403,
    [error],
  );

  useEffect(() => {
    if (isForbidden) {
      router.replace('/');
    }
  }, [isForbidden, router]);

  const approveMutation = useMutation({
    mutationFn: (targetUserId: string) =>
      API.groupService.approveJoinRequest({ groupId, targetUserId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: groupKeys.joinRequests(groupId, 'PENDING'),
        refetchType: 'active',
      });
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(groupId) });
      run(<Toast type='success'>모임 신청이 수락되었습니다.</Toast>);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (targetUserId: string) =>
      API.groupService.rejectJoinRequest({ groupId, targetUserId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: groupKeys.joinRequests(groupId, 'PENDING'),
        refetchType: 'active',
      });
      run(<Toast>모임 신청이 거절되었습니다.</Toast>);
    },
  });

  const handleApprove = useCallback(
    (targetUserId: string) => {
      approveMutation.mutate(targetUserId);
    },
    [approveMutation],
  );

  const handleReject = useCallback(
    (targetUserId: string) => {
      rejectMutation.mutate(targetUserId);
    },
    [rejectMutation],
  );

  if (isLoading && !data && !error) {
    return <PendingMembersSkeleton />;
  }

  if (isForbidden) {
    return null;
  }

  if (error && (!('status' in error) || error.status !== 403)) {
    return (
      <section className={`relative ${PENDING_MEMBERS_MIN_HEIGHT}`}>
        <div className='flex-center h-full text-gray-600'>데이터를 불러오는데 실패했습니다.</div>
      </section>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <section className={`relative ${PENDING_MEMBERS_MIN_HEIGHT}`}>
        <EmptyState>승인 대기 중인 멤버가 없습니다</EmptyState>
      </section>
    );
  }

  return (
    <section className='mt-5 px-4 pb-5'>
      <ul className='space-y-4'>
        {data.items.map((member) => (
          <li key={`${member.userId}-${member.groupUserId}-${member.joinedAt}`}>
            <PendingMemberCard
              member={member}
              onApprove={() => handleApprove(String(member.userId))}
              onReject={() => handleReject(String(member.userId))}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
