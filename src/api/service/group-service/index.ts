import { api } from '@/api/core';
import {
  GetGroupsPayload,
  GetGroupsResponse,
  GetMyGroupsPayload,
  GetMyGroupsResponse,
} from '@/types/service/group';

export const groupServiceRemote = () => ({
  // 모임 목록 조회 (GET /groups)
  getGroups: async (payload: GetGroupsPayload): Promise<GetGroupsResponse> => {
    const params = new URLSearchParams();
    if (payload.keyword) {
      params.append('keyword', payload.keyword);
    }
    if (payload.cursor !== undefined) {
      params.append('cursor', payload.cursor.toString());
    }
    params.append('size', payload.size.toString());

    return api.get<GetGroupsResponse>(`/groups?${params.toString()}`);
  },
  // 내 모임 목록 조회 (GET /groups/me) :스케줄러 페이지
  getMyGroups: async (payload: GetMyGroupsPayload): Promise<GetMyGroupsResponse> => {
    const params = new URLSearchParams();
    params.append('type', payload.type);
    if (payload.cursor !== undefined) {
      params.append('cursor', payload.cursor.toString());
    }
    params.append('size', payload.size.toString());

    return api.get<GetMyGroupsResponse>(`/groups/me?${params.toString()}`);
  },
});
