import { useCallback, useEffect, useRef, useState } from 'react';

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { ChatMessage } from '@/types/service/chat';

interface UseChatSocketOptions {
  roomId: number;
  userId: number;
  accessToken: string | null;
  onMessage?: (message: ChatMessage) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNotification?: (notification: any) => void;
}

export const useChatSocket = ({
  roomId,
  userId,
  accessToken,
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
    if (!accessToken) return;
    const client = new Client({
      webSocketFactory: () => {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws-chat`, null, {
          transports: ['websocket'], // WebSocket만 사용
        });
        return socket;
      },
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 60000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setIsConnected(true);
      console.log('WebSocket connected');

      // 채팅방 구독
      client.subscribe(`/sub/chat/room/${roomId}`, (message: IMessage) => {
        const payload: ChatMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, payload]);
        onMessageRef.current?.(payload);
      });

      // 개인 알림 구독
      client.subscribe(`/sub/user/${userId}`, (message: IMessage) => {
        const payload = JSON.parse(message.body);
        onNotificationRef.current?.(payload);
      });
    };

    client.onDisconnect = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };

    client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId, userId, accessToken]);

  const sendMessage = useCallback(
    (content: string) => {
      if (clientRef.current?.connected) {
        clientRef.current.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            chatRoomId: roomId,
            content,
          }),
        });
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
