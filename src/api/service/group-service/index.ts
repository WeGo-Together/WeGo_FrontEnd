import { baseAPI } from '@/api/core/base';
import {
  AttendGroupPayload,
  CreateGroupPayload,
  CreateGroupResponse,
  GetGroupDetailsResponse,
  GetGroupsPayload,
  GetGroupsResponse,
  GetJoinRequestsResponse,
  GetMyGroupsPayload,
  GetMyGroupsResponse,
  GroupIdParams,
  KickGroupMemberParams,
  KickGroupMemberResponse,
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

    return baseAPI.get<GetGroupsResponse>(`/api/v2/groups?${params.toString()}`);
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

    return baseAPI.get<GetMyGroupsResponse>(`/api/v2/groups/me?${params.toString()}`);
  },

  // 모임 이미지 사전 업로드 (POST /groups/images/upload) - multipart/form-data

  createGroup: (payload: CreateGroupPayload) => {
    return baseAPI.post<CreateGroupResponse>('/api/v2/groups/create', payload);
  },

  editGroup: (params: GroupIdParams, payload: CreateGroupPayload) => {
    return baseAPI.patch<CreateGroupResponse>(`/api/v2/groups/${params.groupId}`, payload);
  },

  getGroupDetails: (params: GroupIdParams) => {
    return baseAPI.get<GetGroupDetailsResponse>(`/api/v2/groups/${params.groupId}`);
  },

  attendGroup: (params: GroupIdParams, payload?: AttendGroupPayload) => {
    // 승인제 모임 신청 시 message 포함해서 API 요청
    if (payload) {
      return baseAPI.post<GetGroupDetailsResponse>(
        `/api/v2/groups/${params.groupId}/attend`,
        payload,
      );
    }
    return baseAPI.post<GetGroupDetailsResponse>(`/api/v2/groups/${params.groupId}/attend`);
  },

  leaveGroup: (params: GroupIdParams) => {
    return baseAPI.post<GetGroupDetailsResponse>(`/api/v2/groups/${params.groupId}/left`);
  },

  deleteGroup: (params: GroupIdParams) => {
    return baseAPI.delete<void>(`/api/v2/groups/${params.groupId}`);
  },

  kickGroupMember: (params: KickGroupMemberParams) => {
    return baseAPI.post<KickGroupMemberResponse>(
      `/api/v2/groups/${params.groupId}/attendance/${params.targetUserId}/kick`,
    );
  },

  // 가입 신청 목록 조회 (GET /api/v2/groups/{groupId}/attendance?status=PENDING)
  getJoinRequests: (params: GroupIdParams, status: string = 'PENDING') => {
    const queryParams = new URLSearchParams();
    queryParams.append('status', status);
    return baseAPI.get<GetJoinRequestsResponse>(
      `/api/v2/groups/${params.groupId}/attendance?${queryParams.toString()}`,
    );
  },

  // 승인 (POST /api/v2/groups/{groupId}/attendance/{targetUserId}/approve)
  approveJoinRequest: (params: KickGroupMemberParams) => {
    return baseAPI.post<GetGroupDetailsResponse>(
      `/api/v2/groups/${params.groupId}/attendance/${params.targetUserId}/approve`,
    );
  },

  // 거절 (POST /api/v2/groups/{groupId}/attendance/{targetUserId}/reject)
  rejectJoinRequest: (params: KickGroupMemberParams) => {
    return baseAPI.post<GetGroupDetailsResponse>(
      `/api/v2/groups/${params.groupId}/attendance/${params.targetUserId}/reject`,
    );
  },

  uploadGroupImages: (payload: FormData) => {
    return baseAPI.post<PreUploadGroupImageResponse>('/api/v2/groups/images/upload', payload);
  },
});
