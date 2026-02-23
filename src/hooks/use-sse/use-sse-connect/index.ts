import { useEffect, useRef, useState } from 'react';

import Cookies from 'js-cookie';

import { API } from '@/api';
import { NotificationItem } from '@/types/service/notification';

export const useSSEConnect = () => {
  const [data, setData] = useState<NotificationItem | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const retryRefreshRef = useRef(false);
  const isMountedRef = useRef(true);

  // SSE 연결 진입점
  const connect = () => {
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
    if (!isMountedRef.current) {
      console.log('[DEBUG] SSE - 언마운트된 컴포넌트, 연결 중단');
      return;
    }

    // 1. 기존 연결 정리
    if (eventSourceRef.current) {
      console.log('[DEBUG] SSE - 기존 연결 정리');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // 2. SSE 연결 시도
    console.log('[DEBUG] SSE - 연결 시도');
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/subscribe?accessToken=${token}`,
    );

    eventSourceRef.current = es;

    // 3. SSE 연결 성공 시
    es.addEventListener('connect', (event) => {
      console.log('[DEBUG] SSE - 연결 확인:', event.data);
      retryRefreshRef.current = false;
    });

    // 4. SSE 이벤트 수신 시
    es.addEventListener('notification', (event) => {
      try {
        const receivedData = JSON.parse(event.data) as NotificationItem;
        setData(receivedData);
        console.log('[DEBUG] SSE - 수신 성공:', receivedData);
      } catch (error) {
        console.error('[DEBUG] SSE - 데이터 파싱 실패:', error);
      }
    });

    // 5. SSE 연결 오류 발생 시
    es.onerror = async (_error) => {
      console.log('[DEBUG] SSE - 연결 오류 발생');
      es.close();
      if (retryRefreshRef.current) return;
      reconnect();
    };
  };

  useEffect(() => {
    isMountedRef.current = true;
    connect();
    return () => {
      isMountedRef.current = false;
      disconnect();
    };
  }, []);

  // 알림 수신 후 3초 뒤 data가 null로 변경됨
  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      setData(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [data]);

  return { data };
};
