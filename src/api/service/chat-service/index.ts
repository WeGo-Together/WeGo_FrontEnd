import { baseAPI } from '@/api/core';
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
    return baseAPI.get<GetChatRoomsResponse>('/api/v1/chat/rooms');
  },

  // 1:1(DM) 채팅방 생성
  createDMChatRoom: async (payloads: CreateDMPayloads) => {
    return baseAPI.post<ChattingRoom>('/api/v1/chat/dm', payloads);
  },

  // 메세지 이력 조회
  getChatMessages: async ({ roomId, cursor, size }: GetChatMessagesParams) => {
    return baseAPI.get<GetChatMessagesResponse>(`/api/v1/chat/rooms/${roomId}/messages`, {
      params: {
        cursor,
        size,
      },
    });
  },

  // 메세지 읽음 처리
  readMessages: async ({ roomId }: ReadMessagesParams) => {
    return baseAPI.put<ReadMessagesResponse>(`/api/v1/chat/rooms/${roomId}/read`);
  },

  // 채팅방 상세 조회
  getChatRoom: async ({ roomId }: GetChatRoomParams) => {
    return baseAPI.get<getChatRoomResponse>(`/api/v1/chat/rooms/${roomId}`);
  },

  // 참여자 목록 조회
  getParticipants: async ({ roomId }: GetParticipantsParams) => {
    return baseAPI.get<GetParticipantsResponse>(`/api/v1/chat/rooms/${roomId}/participants`);
  },

  // 추방하기
  kickUser: async (roomId: number, payload: KickUserPayloads) => {
    return baseAPI.post(`/api/v1/chat/rooms/${roomId}/kick`, payload);
  },
});
