import { api } from '@/api/core';
import {
  CreateGroupPayload,
  CreateGroupResponse,
  GetGroupDetailsResponse,
  GetGroupsPayload,
  GetGroupsResponse,
  GetMyGroupsPayload,
  GetMyGroupsResponse,
  GroupIdPayload,
  PreUploadGroupImagePayload,
  PreUploadGroupImageResponse,
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

  // 모임 이미지 사전 업로드 (POST /groups/images/upload) - multipart/form-data
  uploadGroupImages: (payload: PreUploadGroupImagePayload) => {
    return api.post<PreUploadGroupImageResponse>('/groups/images/upload', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  createGroup: (payload: CreateGroupPayload) => {
    return api.post<CreateGroupResponse>('/groups/create', payload);
  },

  getGroupDetails: (payload: GroupIdPayload) => {
    return api.get<GetGroupDetailsResponse>(`/groups/${payload.groupId}`);
  },

  attendGroup: (payload: GroupIdPayload) => {
    return api.post<GetGroupDetailsResponse>(`/groups/${payload.groupId}/attend`);
  },

  cancelGroup: (payload: GroupIdPayload) => {
    return api.post<GetGroupDetailsResponse>(`/groups/${payload.groupId}/cancel`);
  },

  deleteGroup: (payload: GroupIdPayload) => {
    return api.delete(`/groups/${payload.groupId}`);
  },
});
