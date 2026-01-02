import { useEffect, useRef } from 'react';

import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import SockJS from 'sockjs-client';

interface UseChatListSocketOptions {
  userId: number;
  accessToken: string | null;
  chatRoomIds: number[]; // 구독할 채팅방 ID 목록
}

export const useChatListSocket = ({
  userId,
  accessToken,
  chatRoomIds,
}: UseChatListSocketOptions) => {
  const clientRef = useRef<Client | null>(null);
  const queryClient = useQueryClient();
  const subscriptionsRef = useRef<Map<number, StompSubscription>>(new Map());

  useEffect(() => {
    if (!accessToken || chatRoomIds.length === 0) return;

    const client = new Client({
      webSocketFactory: () => {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws-chat`, null, {
          transports: ['websocket'],
        });
        return socket;
      },
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 6000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('✅ Chat list socket connected');

      // 모든 채팅방 구독
      chatRoomIds.forEach((roomId) => {
        const subscription = client.subscribe(`/sub/chat/room/${roomId}`, (message: IMessage) => {
          const payload = JSON.parse(message.body);
          console.log('🔔 새 메시지 수신:', payload);

          // 채팅 목록 갱신
          queryClient.invalidateQueries({
            queryKey: ['chatList', userId],
            exact: true,
          });
        });

        subscriptionsRef.current.set(roomId, subscription);
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      // 모든 구독 해제
      subscriptionsRef.current.forEach((subscription) => {
        subscription.unsubscribe();
      });
      subscriptionsRef.current.clear();
      client.deactivate();
    };
  }, [userId, accessToken, chatRoomIds, queryClient]);
};
