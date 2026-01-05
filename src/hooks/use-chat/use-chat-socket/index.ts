import { useCallback, useEffect, useRef, useState } from 'react';

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { ChatMessage } from '@/types/service/chat';

interface UseChatSocketOptions {
  roomId: number;
  userId: number;
  enabled?: boolean;
  accessToken: string | null;
  onMessage?: (message: ChatMessage) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNotification?: (notification: any) => void;
}

export const useChatSocket = ({
  roomId,
  userId,
  accessToken,
  enabled = true,
  onMessage,
  onNotification,
}: UseChatSocketOptions) => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const onMessageRef = useRef(onMessage);
  const onNotificationRef = useRef(onNotification);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    if (!accessToken || !enabled) return;

    const client = new Client({
      webSocketFactory: () => {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws-chat`, null, {});
        return socket;
      },
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(str);
        }
      },
      reconnectDelay: 6000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setIsConnected(true);
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket connected');
      }
      // 채팅방 구독
      client.subscribe(`/sub/chat/room/${roomId}`, (message: IMessage) => {
        try {
          const payload: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, payload]);
          onMessageRef.current?.(payload);
        } catch (error) {
          console.error('Failed to parse chat message:', error);
        }
      });

      // 개인 알림 구독
      client.subscribe(`/sub/user/${userId}`, (message: IMessage) => {
        try {
          const payload = JSON.parse(message.body);
          onNotificationRef.current?.(payload);
        } catch (error) {
          console.error('Failed to parse notification:', error);
        }
      });

      clientRef.current = client;
    };

    client.onDisconnect = () => {
      setIsConnected(false);
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket disconnected');
      }
    };

    client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      setIsConnected(false);
    };

    client.onWebSocketError = (event) => {
      console.error('WebSocket error:', event);
      setIsConnected(false);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        // 연결이 활성화되어 있을 때만 deactivate
        if (clientRef.current.active) {
          clientRef.current.deactivate();
        }
        clientRef.current = null;
      }
      setIsConnected(false);
      setMessages([]); // 메시지 초기화
    };
  }, [roomId, userId, accessToken, enabled]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!clientRef.current?.connected) {
        if (process.env.NODE_ENV === 'development') {
          console.log('WebSocket is not connected');
        }
        return false;
      }

      try {
        clientRef.current.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            chatRoomId: roomId,
            content: content.trim(),
          }),
        });
        return true;
      } catch (error) {
        console.error('Failed to send message:', error);
        return false;
      }
    },
    [roomId],
  );

  return {
    isConnected,
    messages,
    sendMessage,
  };
};
