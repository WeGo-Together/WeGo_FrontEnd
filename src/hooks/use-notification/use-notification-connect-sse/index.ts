import { useEffect, useRef, useState } from 'react';

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
  const queryClient = useQueryClient();

  // SSE 연결 진입점
  const connect = () => {
    if (!isAuthenticated) {
      console.log('[DEBUG] SSE - 인증되지 않음');
      return;
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      console.log('[DEBUG] SSE - 토큰 없음');
      return;
    }

    setupSSEConnection(token);
  };

  // SSE 연결 해제 함수
  const disconnect = () => {
    if (eventSourceRef.current) {
      console.log('[DEBUG] SSE - 연결 정리');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    retryRefreshRef.current = false;
  };

  // SSE 재연결 시도 함수
  const reconnect = async () => {
    if (!hasRefreshToken || retryRefreshRef.current) return;

    retryRefreshRef.current = true;
    console.log('[DEBUG] SSE - 토큰 갱신 시도');

    try {
      await API.authService.refresh();
      const token = Cookies.get('accessToken');
      if (token) {
        setupSSEConnection(token);
      }
    } catch (error) {
      console.error('[DEBUG] SSE - 토큰 갱신 실패:', error);
      disconnect();
    }
  };

  // SSE 연결 설정 함수
  const setupSSEConnection = (token: string) => {
    // 기존 연결 정리
    if (eventSourceRef.current) {
      console.log('[DEBUG] SSE - 기존 연결 정리');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    console.log('[DEBUG] SSE - 연결 시도');

    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/subscribe?accessToken=${token}`,
    );

    eventSourceRef.current = es;

    es.addEventListener('connect', (event) => {
      console.log('[DEBUG] SSE - 연결 확인:', event.data);
      retryRefreshRef.current = false;
    });

    es.addEventListener('notification', (event) => {
      try {
        const data = JSON.parse(event.data) as NotificationItem;
        console.log('[DEBUG] SSE - 수신 성공:', data);
        setReceivedNewNotification(true);

        queryClient.invalidateQueries({ queryKey: notificationKeys.unReadCount() });
        queryClient.invalidateQueries({ queryKey: notificationKeys.list() });

        switch (data.type) {
          case 'FOLLOW':
            queryClient.invalidateQueries({ queryKey: userKeys.me() });
            queryClient.invalidateQueries({ queryKey: userKeys.item(data.user.id) });
            break;
          case 'GROUP_CREATE':
          case 'GROUP_DELETE':
            queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
            break;
          case 'GROUP_JOIN':
          case 'GROUP_LEAVE':
          case 'GROUP_JOIN_APPROVED':
          case 'GROUP_JOIN_REJECTED':
          case 'GROUP_JOIN_KICKED':
            if (data.group) {
              queryClient.invalidateQueries({ queryKey: groupKeys.detail(String(data.group.id)) });
            }
            break;
          case 'GROUP_JOIN_REQUEST':
            if (data.group) {
              queryClient.invalidateQueries({
                queryKey: groupKeys.joinRequests(String(data.group.id), 'PENDING'),
              });
            }
            break;
        }
      } catch (error) {
        console.error('[DEBUG] SSE - 데이터 파싱 실패:', error);
      }
    });

    es.onerror = async (_error) => {
      console.log('[DEBUG] SSE - 연결 오류 발생');
      es.close();
      reconnect(); // ✅ 재연결 함수 호출
    };
  };

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
