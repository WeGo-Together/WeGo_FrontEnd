import { useCallback, useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { notificationKeys } from '@/lib/query-key/query-key-notification';
import { userKeys } from '@/lib/query-key/query-key-user';
import { useAuth } from '@/providers/provider-auth';
import { NotificationItem } from '@/types/service/notification';

export const useConnectSSE = (hasRefreshToken: boolean) => {
  const [receivedNewNotification, setReceivedNewNotification] = useState(false);
  const { isAuthenticated } = useAuth();

  const eventSourceRef = useRef<EventSource | null>(null);
  const retryRefreshRef = useRef(false);
  const connectRef = useRef<() => void>(null);
  const queryClient = useQueryClient();

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      console.log('[DEBUG] SSE - 연결 정리');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    retryRefreshRef.current = false;
  }, []);

  const connect = useCallback(() => {
    if (!isAuthenticated) {
      return;
    }

    // 기존 연결이 있으면 정리
    if (eventSourceRef.current) {
      console.log('[DEBUG] SSE - 기존 연결 정리');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    const token = Cookies.get('accessToken');

    // SSE 연결 시도
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/subscribe?accessToken=${token}`,
    );

    eventSourceRef.current = es;

    // SSE 연결 성공 시
    es.addEventListener('connect', (event) => {
      console.log('[DEBUG] SSE - 연결 확인:', event.data);
      retryRefreshRef.current = false;
    });
    // SSE 알림 수신 시
    es.addEventListener('notification', (event) => {
      try {
        const data = JSON.parse(event.data) as NotificationItem;
        console.log('[DEBUG] SSE - 수신 성공:', data);
        setReceivedNewNotification(true);

        // Query Key 무효화
        // 공통
        queryClient.invalidateQueries({ queryKey: notificationKeys.unReadCount() });
        queryClient.invalidateQueries({ queryKey: notificationKeys.list() });

        switch (data.type) {
          case 'FOLLOW': // 서버 문제 해결 후 검증 필요
            queryClient.invalidateQueries({ queryKey: userKeys.me() });
            queryClient.invalidateQueries({ queryKey: userKeys.item(data.user.id) });
            break;
          case 'GROUP_CREATE':
          case 'GROUP_DELETE':
            queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
            break;
          case 'GROUP_JOIN': //OK
          case 'GROUP_LEAVE': //OK
          case 'GROUP_JOIN_APPROVED': //OK
          case 'GROUP_JOIN_REJECTED': //OK
          case 'GROUP_JOIN_KICKED': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({ queryKey: groupKeys.detail(String(data.group.id)) });
            break;
          case 'GROUP_JOIN_REQUEST': //OK
            if (data.group === null) return;
            queryClient.invalidateQueries({
              queryKey: groupKeys.joinRequests(String(data.group.id), 'PENDING'),
            });
            break;
        }
      } catch (error) {
        console.error('[DEBUG] SSE - 데이터 파싱 실패:', error);
      }
    });

    // SSE 연결 실패 시
    es.onerror = async (_error) => {
      console.log('[DEBUG] SSE - 연결 오류 발생:');
      es.close();

      if (hasRefreshToken && !retryRefreshRef.current) {
        retryRefreshRef.current = true;
        console.log('[DEBUG] SSE - 토큰 갱신 시도');
        try {
          await API.authService.refresh();
          connectRef.current?.();
          return;
        } catch (error) {
          console.error('[DEBUG] SSE - 토큰 갱신 실패:', error);
        }
      }
    };
  }, [hasRefreshToken, isAuthenticated, queryClient]);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  // 알림 수신 후 3초 뒤 receivedNewNotification이 false로 변경됨
  useEffect(() => {
    if (!receivedNewNotification) return;

    const timer = setTimeout(() => {
      setReceivedNewNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [receivedNewNotification]);

  return { receivedNewNotification, connect, disconnect };
};
