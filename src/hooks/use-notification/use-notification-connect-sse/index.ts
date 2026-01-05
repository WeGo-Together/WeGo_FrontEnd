import { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { groupKeys } from '@/lib/query-key/query-key-group';
import { notificationKeys } from '@/lib/query-key/query-key-notification';
import { userKeys } from '@/lib/query-key/query-key-user';
import { useAuth } from '@/providers/provider-auth';
import { NotificationItem } from '@/types/service/notification';

export const useConnectSSE = () => {
  const [receivedNewNotification, setReceivedNewNotification] = useState(false);

  const { isAuthenticated } = useAuth();
  const eventSourceRef = useRef<EventSource | null>(null);
  const queryClient = useQueryClient();

  // 알림 수신 후 3초 뒤 receivedNewNotification이 false로 변경됨
  useEffect(() => {
    if (!receivedNewNotification) return;

    const timer = setTimeout(() => {
      setReceivedNewNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [receivedNewNotification]);

  // SSE 연결 관련 로직
  useEffect(() => {
    if (!isAuthenticated) return;

    // 기존 연결이 있으면 정리
    if (eventSourceRef.current) {
      console.log('[DEBUG] SSE 기존 연결 정리');
      eventSourceRef.current.close();
    }

    const token = Cookies.get('accessToken');

    // SSE 연결 시도
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/subscribe?accessToken=${token}`,
    );

    eventSourceRef.current = es;

    // SSE 연결 성공 시
    es.addEventListener('connect', (event) => {
      console.log('[DEBUG] SSE 연결 확인:', event.data);
    });

    // SSE 알림 수신 시
    es.addEventListener('notification', (event) => {
      try {
        const data = JSON.parse(event.data) as NotificationItem;
        console.log('[DEBUG] SSE 수신 성공:', data);
        setReceivedNewNotification(true);

        // Query Key 무효화
        // 공통
        queryClient.invalidateQueries({ queryKey: notificationKeys.unReadCount() });
        queryClient.invalidateQueries({ queryKey: notificationKeys.list() });

        switch (data.type) {
          case 'FOLLOW': // 서버 문제 해결 후 검증 필요
            queryClient.invalidateQueries({ queryKey: userKeys.me() });
            queryClient.invalidateQueries({ queryKey: userKeys.item(data.user.id) });
            return;
          case 'GROUP_CREATE': // 모임 목록이 react query 아니라서 업데이트 안됨
            queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
            return;
          case 'GROUP_DELETE': // 모임 목록이 react query 아니라서 업데이트 안됨
            queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
            return;
          case 'GROUP_JOIN': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({ queryKey: groupKeys.detail(String(data.group.id)) });
            return;
          case 'GROUP_LEAVE': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({ queryKey: groupKeys.detail(String(data.group.id)) });
            return;
          case 'GROUP_JOIN_REQUEST': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({
              queryKey: groupKeys.joinRequests(String(data.group.id), 'PENDING'),
            });
          case 'GROUP_JOIN_APPROVED': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({ queryKey: groupKeys.detail(String(data.group.id)) });
          case 'GROUP_JOIN_REJECTED': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({ queryKey: groupKeys.detail(String(data.group.id)) });
          case 'GROUP_JOIN_KICKED': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({ queryKey: groupKeys.detail(String(data.group.id)) });
        }
      } catch (error) {
        console.error('[DEBUG] SSE 데이터 파싱 실패:', error);
      }
    });

    // SSE 연결 실패 시
    es.onerror = (_error) => {
      console.log('[DEBUG] SSE 오류 발생:');
      // todo: 재 연결 로직 추가 필요
    };

    // SSE Cleanup
    return () => {
      console.log('[DEBUG] SSE 연결 정리');
      es.close();
      eventSourceRef.current = null;
    };
  }, [isAuthenticated, queryClient]);

  return { receivedNewNotification };
};
