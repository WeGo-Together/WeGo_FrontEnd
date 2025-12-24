import { useEffect, useRef } from 'react';

import { useAuth } from '@/providers/provider-auth';

export const useConnectSSE = () => {
  const { accessToken } = useAuth();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!accessToken.value) return;

    // 기존 연결이 있으면 정리
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/subscribe?accessToken=${accessToken.value}`,
    );

    eventSourceRef.current = es;

    es.addEventListener('connect', (event) => {
      console.log('SSE 연결 확인:', event.data);
    });

    es.addEventListener('notification', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('SSE 수신 성공:', data);

        // TODO: 알림 타입별 처리 추가 예정
      } catch (error) {
        console.error('SSE 데이터 파싱 실패:', error);
      }
    });

    es.onerror = (_error) => {
      console.log('SSE 오류 발생:');
      // todo: 재 연결 로직 추가 필요
    };

    return () => {
      console.log('SSE 연결 정리');
      es.close();
      eventSourceRef.current = null;
    };
  }, [accessToken.value]);
};
