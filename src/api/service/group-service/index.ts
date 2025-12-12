import { api, baseAPI } from '@/api/core';
import { CommonSuccessResponse } from '@/types/service/common';
import {
  CreateGroupPayload,
  CreateGroupResponse,
  GetGroupsPayload,
  GetGroupsResponse,
  GetMyGroupsPayload,
  GetMyGroupsResponse,
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
  uploadGroupImages: async (
    payload: PreUploadGroupImagePayload,
  ): Promise<PreUploadGroupImageResponse> => {
    const formData = new FormData();
    payload.images.forEach((file) => {
      if (file instanceof File) {
        formData.append('images', file);
      } else {
        console.error('[이미지 업로드 오류] File 객체가 아닌 값이 포함됨:', file);
        throw new Error('이미지 파일은 File 객체여야 합니다.');
      }
    });

    const response = await baseAPI.post<CommonSuccessResponse<PreUploadGroupImageResponse>>(
      '/groups/images/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.data;
  },

  createGroup: (payload: CreateGroupPayload) => {
    return api.post<CreateGroupResponse>('/groups/create', payload);
  },
});
