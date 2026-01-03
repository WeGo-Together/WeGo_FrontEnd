import { apiV1 } from '@/api/core';
import {
  ChattingRoom,
  CreateDMPayloads,
  GetChatMessagesParams,
  GetChatMessagesResponse,
  GetChatRoomParams,
  getChatRoomResponse,
  GetChatRoomsResponse,
  GetParticipantsParams,
  GetParticipantsResponse,
  KickUserPayloads,
  ReadMessagesParams,
  ReadMessagesResponse,
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

  // 메세지 읽음 처리
  readMessages: async ({ roomId }: ReadMessagesParams) => {
    return apiV1.put<ReadMessagesResponse>(`/chat/rooms/${roomId}/read`);
  },

  // 채팅방 상세 조회
  getChatRoom: async ({ roomId }: GetChatRoomParams) => {
    return apiV1.get<getChatRoomResponse>(`/chat/rooms/${roomId}`);
  },

  // 참여자 목록 조회
  getParticipants: async ({ roomId }: GetParticipantsParams) => {
    return apiV1.get<GetParticipantsResponse>(`/chat/rooms/${roomId}/participants`);
  },

  // 추방하기
  kickUser: async (roomId: number, payload: KickUserPayloads) => {
    return apiV1.post(`/chat/rooms/${roomId}/kick`, payload);
  },
});
