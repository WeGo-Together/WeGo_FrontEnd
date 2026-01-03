'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { EmptyState } from '@/components/layout/empty-state';
import { GetJoinRequestsResponse } from '@/types/service/group';

import { PendingMemberCard } from './pending-member-card';

interface Props {
  groupId: string;
}

export const GroupPendingMembers = ({ groupId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<GetJoinRequestsResponse>({
    queryKey: ['joinRequests', groupId, 'PENDING'],
    queryFn: () => API.groupService.getJoinRequests({ groupId }, 'PENDING'),
  });

  const isForbidden =
    error && typeof error === 'object' && 'status' in error && error.status === 403;

  useEffect(() => {
    if (isForbidden) {
      router.replace('/');
    }
  }, [isForbidden, router]);

  const approveMutation = useMutation({
    mutationFn: (targetUserId: string) =>
      API.groupService.approveJoinRequest({ groupId, targetUserId }),
    onSuccess: async () => {
      // 가입 신청 목록 캐시 무효화 및 자동 refetch
      // GroupPendingSummary의 count도 자동으로 업데이트됨
      await queryClient.invalidateQueries({
        queryKey: ['joinRequests', groupId, 'PENDING'],
        refetchType: 'active', // 활성화된 모든 쿼리 자동 refetch
      });
      // 모임 상세 정보도 갱신
      await queryClient.invalidateQueries({ queryKey: ['groupDetails', groupId] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (targetUserId: string) =>
      API.groupService.rejectJoinRequest({ groupId, targetUserId }),
    onSuccess: async () => {
      // 가입 신청 목록 캐시 무효화 및 모든 활성 쿼리 refetch
      // GroupPendingSummary의 count도 자동으로 업데이트됨
      await queryClient.invalidateQueries({
        queryKey: ['joinRequests', groupId, 'PENDING'],
        refetchType: 'active', // 활성화된 모든 쿼리 자동 refetch
      });
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

  if (isLoading) {
    return (
      <section className='relative h-[calc(100vh-192px)]'>
        <div className='flex-center h-full'>로딩 중...</div>
      </section>
    );
  }

  if (isForbidden) {
    return null;
  }

  if (error && (!('status' in error) || error.status !== 403)) {
    return (
      <section className='relative h-[calc(100vh-192px)]'>
        <div className='flex-center h-full text-gray-600'>데이터를 불러오는데 실패했습니다.</div>
      </section>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <section className='relative h-[calc(100vh-192px)]'>
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
