import { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { notificationKeys } from '@/lib/query-key/query-key-notification';
import { useAuth } from '@/providers/provider-auth';

export const useConnectSSE = () => {
  const [receivedNewNotification, setReceivedNewNotification] = useState(false);

  const { accessToken } = useAuth();
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
    if (!accessToken.value) return;

    // 기존 연결이 있으면 정리
    if (eventSourceRef.current) {
      console.log('SSE 기존 연결 정리');
      eventSourceRef.current.close();
    }

    // SSE 연결 시도
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/subscribe?accessToken=${accessToken.value}`,
    );

    eventSourceRef.current = es;

    // SSE 연결 성공 시
    es.addEventListener('connect', (event) => {
      console.log('SSE 연결 확인:', event.data);
    });

    // SSE 알림 수신 시
    es.addEventListener('notification', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('SSE 수신 성공:', data);
        setReceivedNewNotification(true);
        queryClient.invalidateQueries({ queryKey: notificationKeys.unReadCount() });
        queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
        // TODO: 알림 타입별 처리 추가 예정
      } catch (error) {
        console.error('SSE 데이터 파싱 실패:', error);
      }
    });

    // SSE 연결 실패 시
    es.onerror = (_error) => {
      console.log('SSE 오류 발생:');
      // todo: 재 연결 로직 추가 필요
      accessToken.value = null;
    };

    // SSE Cleanup
    return () => {
      console.log('SSE 연결 정리');
      es.close();
      eventSourceRef.current = null;
    };
  }, [accessToken, accessToken.value, queryClient]);

  return { receivedNewNotification };
};
