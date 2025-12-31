import { apiV1 } from '@/api/core';
import {
  ChattingRoom,
  CreateDMPayloads,
  GetChatMessagesParams,
  GetChatMessagesResponse,
  GetChatRoomsResponse,
} from '@/types/service/chat';

export const chatServiceRemote = () => ({
  // 채팅방 목록 조회
  getChatRooms: async () => {
    return apiV1.get<GetChatRoomsResponse>('/chat/rooms');
  },

  // 1:1(DM) 채팅방 생성
  createDMChatRoom: async (payloads: CreateDMPayloads) => {
    return apiV1.post<ChattingRoom>('/chat/dm', payloads);
  },

  // 메세지 이력 조회
  getChatMessages: async ({ roomId, cursor, size }: GetChatMessagesParams) => {
    return apiV1.get<GetChatMessagesResponse>(`/chat/rooms/${roomId}/messages`, {
      params: {
        cursor,
        size,
      },
    });
  },
});
