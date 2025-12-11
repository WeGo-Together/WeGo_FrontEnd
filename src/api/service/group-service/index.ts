import { api } from '@/api/core';
import { GetGroupsPayload, GetGroupsResponse } from '@/types/service/group';

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
});
