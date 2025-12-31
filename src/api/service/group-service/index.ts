import { apiV2 } from '@/api/core';
import {
  AttendGroupPayload,
  CreateGroupPayload,
  CreateGroupResponse,
  GetGroupDetailsResponse,
  GetGroupsPayload,
  GetGroupsResponse,
  GetMyGroupsPayload,
  GetMyGroupsResponse,
  GroupIdParams,
  KickGroupMemberParams,
  PreUploadGroupImageResponse,
} from '@/types/service/group';

export const groupServiceRemote = () => ({
  // 모임 목록 조회 (GET /api/v2/groups)
  getGroups: async (payload: GetGroupsPayload): Promise<GetGroupsResponse> => {
    const params = new URLSearchParams();
    if (payload.keyword) {
      params.append('keyword', payload.keyword);
    }
    if (payload.cursor !== undefined) {
      params.append('cursor', payload.cursor.toString());
    }
    params.append('size', payload.size.toString());

    return apiV2.get<GetGroupsResponse>(`/groups?${params.toString()}`);
  },
  // 내 모임 목록 조회 (GET /api/v2/groups/me) :스케줄러 페이지
  getMyGroups: async (payload: GetMyGroupsPayload): Promise<GetMyGroupsResponse> => {
    const params = new URLSearchParams();
    params.append('type', payload.type);
    if (payload.cursor !== undefined) {
      params.append('cursor', payload.cursor.toString());
    }
    params.append('size', payload.size.toString());
    if (payload.filter) {
      params.append('filter', payload.filter);
    }
    if (payload.includeStatuses && payload.includeStatuses.length > 0) {
      payload.includeStatuses.forEach((status) => {
        params.append('includeStatuses', status);
      });
    }
    if (payload.excludeStatuses && payload.excludeStatuses.length > 0) {
      payload.excludeStatuses.forEach((status) => {
        params.append('excludeStatuses', status);
      });
    }
    if (payload.myStatuses && payload.myStatuses.length > 0) {
      payload.myStatuses.forEach((status) => {
        params.append('myStatuses', status);
      });
    }

    return apiV2.get<GetMyGroupsResponse>(`/groups/me?${params.toString()}`);
  },

  // 모임 이미지 사전 업로드 (POST /groups/images/upload) - multipart/form-data

  createGroup: (payload: CreateGroupPayload) => {
    return apiV2.post<CreateGroupResponse>('/groups/create', payload);
  },

  editGroup: (params: GroupIdParams, payload: CreateGroupPayload) => {
    return apiV2.patch<CreateGroupResponse>(`/groups/${params.groupId}`, payload);
  },

  getGroupDetails: (params: GroupIdParams) => {
    return apiV2.get<GetGroupDetailsResponse>(`/groups/${params.groupId}`);
  },

  attendGroup: (params: GroupIdParams, payload?: AttendGroupPayload) => {
    // 승인제 모임 신청 시 message 포함해서 API 요청
    if (payload?.message) {
      return apiV2.post<GetGroupDetailsResponse>(`/groups/${params.groupId}/attend`, payload);
    }
    return apiV2.post<GetGroupDetailsResponse>(`/groups/${params.groupId}/attend`);
  },

  leaveGroup: (params: GroupIdParams) => {
    return apiV2.post<GetGroupDetailsResponse>(`/groups/${params.groupId}/left`);
  },

  deleteGroup: (params: GroupIdParams) => {
    return apiV2.delete(`/groups/${params.groupId}`);
  },

  kickGroupMember: (params: KickGroupMemberParams) => {
    return apiV2.post(`/groups/${params.groupId}/attendance/${params.targetUserId}/kick`);
  },

  uploadGroupImages: (payload: FormData) => {
    return apiV2.post<PreUploadGroupImageResponse>('/groups/images/upload', payload);
  },
});
