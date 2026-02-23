import { useEffect } from 'react';

import { QueryKey, useQueryClient } from '@tanstack/react-query';

import { groupKeys } from '@/lib/query-key/query-key-group';
import { notificationKeys } from '@/lib/query-key/query-key-notification';
import { userKeys } from '@/lib/query-key/query-key-user';
import { NotificationItem } from '@/types/service/notification';

const SSE_INVALIDATION_MAP: Partial<
  Record<NotificationItem['type'], (data: NotificationItem) => QueryKey[]>
> = {
  FOLLOW: (data) => [userKeys.me(), userKeys.item(data.user.id)],
  GROUP_CREATE: () => [groupKeys.lists()],
  GROUP_DELETE: () => [groupKeys.lists()],
  GROUP_JOIN: (data) => (data.group ? [groupKeys.detail(String(data.group.id))] : []),
  GROUP_LEAVE: (data) => (data.group ? [groupKeys.detail(String(data.group.id))] : []),
  GROUP_JOIN_APPROVED: (data) => (data.group ? [groupKeys.detail(String(data.group.id))] : []),
  GROUP_JOIN_REJECTED: (data) => (data.group ? [groupKeys.detail(String(data.group.id))] : []),
  GROUP_JOIN_KICKED: (data) => (data.group ? [groupKeys.detail(String(data.group.id))] : []),
  GROUP_JOIN_REQUEST: (data) =>
    data.group ? [groupKeys.joinRequests(String(data.group.id), 'PENDING')] : [],
};

export const useSSEEvent = (data: NotificationItem | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;
    queryClient.invalidateQueries({ queryKey: notificationKeys.unReadCount() });
    queryClient.invalidateQueries({ queryKey: notificationKeys.list() });

    const getQueryKeys = SSE_INVALIDATION_MAP[data.type];
    getQueryKeys?.(data).forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  }, [data]);
};
