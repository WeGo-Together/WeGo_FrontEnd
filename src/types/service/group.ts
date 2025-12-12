// 모임 목록 조회 응답 (GET /api/v1/groups)
export interface GroupListItemResponse {
  id: number;
  title: string;
  location: string;
  locationDetail?: string | null;
  startTime: string; // ISO 8601 형식: "2026-12-25T19:00:00"
  endTime?: string | null; // ISO 8601 형식: "2026-12-25T21:00:00"
  images: string[];
  tags: string[];
  description: string;
  participantCount: number;
  maxParticipants: number;
  createdBy: {
    userId: number;
    nickName: string;
    profileImage: string | null;
  };
  createdAt: string; // ISO 8601 형식
  updatedAt: string; // ISO 8601 형식
}

// 모임 목록 조회 요청 파라미터
export interface GetGroupsPayload {
  keyword?: string;
  cursor?: number;
  size: number;
}

// 모임 목록 조회 응답
export interface GetGroupsResponse {
  items: GroupListItemResponse[];
  nextCursor: number | null;
}

// 내 모임 목록 조회 요청 파라미터 (GET /api/v1/groups/me)
export interface GetMyGroupsPayload {
  type: 'current' | 'myPost' | 'past';
  cursor?: number;
  size: number;
}

// 내 모임 목록 조회 응답
export interface GetMyGroupsResponse {
  items: GroupListItemResponse[];
  nextCursor: number | null;
}

/**

 * 밑에 타입들은 다른 분들이 아직 다른 파일에서 사용 중이므로 그냥 제거해버리시면 안됩니다(다른 분들도 다 수정 후에 제거 예정)
 * 아직 사용 중인 파일:
 * - src/types/service/notification.ts (Notification.group)
 * - src/mock/service/group/group-mock.ts (groupMockItem)
 */
export interface Group {
  id: number;
  title: string;
  location: string;
  locationDetail: string;
  startTime: string;
  endTime: string;
  images: string[];
  tags: string[];
  description: string;
  participantCount: number;
  maxParticipants: number;
  createdBy: {
    userId: number;
    nickName: string;
    profileImage: null | string;
  };
  createdAt: string;
  updatedAt: string;
  joinedCount: number;
}

export interface PreUploadGroupImagePayload {
  images: File[];
}

export interface PreUploadGroupImageResponse {
  images: {
    sortOrder: number;
    imageUrl440x240: string;
    imageUrl100x100: string;
  }[];
}

export type CreateGroupImagePayload = PreUploadGroupImageResponse;

export interface CreateGroupPayload {
  title: string;
  location: string;
  locationDetail?: string | null;
  startTime: string;
  endTime?: string;
  tags?: string[] | null;
  description: string;
  maxParticipants: number;
  images?: CreateGroupImagePayload['images'] | null;
}

export interface CreateGroupResponse {
  id: number;
  title: string;
  location: string;
  locationDetail?: string | null;
  startTime: string;
  endTime?: string;
  tags?: string[] | null;
  description: string;
  participantCount: number;
  maxParticipants: number;
  createdBy: {
    userId: number;
    nickName: string;
    profileImage?: string | null;
  };
  createdAt: string;
  updatedAt: string;
  images?: PreUploadGroupImageResponse | null;
}
