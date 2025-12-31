// Group V2 공통 타입
export type GroupV2Status = 'RECRUITING' | 'FULL' | 'CLOSED' | 'CANCELLED' | 'FINISHED';

export type GroupV2JoinPolicy = 'FREE' | 'APPROVAL_REQUIRED';

export type GroupV2ListFilter = 'ACTIVE' | 'ARCHIVED' | 'ALL';

export type GroupUserV2Status = 'ATTEND' | 'LEFT' | 'KICKED' | 'BANNED' | 'PENDING' | 'REJECTED';

export interface GroupV2Membership {
  groupUserId: number;
  role: 'HOST' | 'MANAGER' | 'MEMBER';
  status: GroupUserV2Status;
  joinedAt: string;
  leftAt: string | null;
}

// 모임 목록 조회 응답 (GET /api/v2/groups, GET /api/v2/groups/me)
export interface GroupListItemResponse {
  id: number;
  title: string;
  // v2 추가 필드
  joinPolicy: GroupV2JoinPolicy;
  status: GroupV2Status;

  location: string;
  locationDetail?: string | null;
  startTime: string; // ISO 8601 형식: "2026-12-25T19:00:00"
  endTime?: string | null; // ISO 8601 형식: "2026-12-25T21:00:00"
  images: string[]; // CARD_440_240 URL 배열 (최대 3개)
  tags: string[];
  description: string;
  participantCount: number;
  maxParticipants: number;
  // v2 추가 필드
  remainingSeats: number;
  joinable: boolean;

  createdBy: {
    userId: number;
    nickName: string;
    profileImage: string | null;
    profileMessage?: string | null;
  };
  createdAt: string; // ISO 8601 형식
  updatedAt: string; // ISO 8601 형식

  // /api/v2/groups/me 에서만 내려오는 필드 (목록에서는 선택적)
  myMembership?: GroupV2Membership | null;
}

// 모임 목록 조회 요청 파라미터 (GET /api/v2/groups)
export interface GetGroupsPayload {
  keyword?: string;
  cursor?: number;
  size: number;
  // v2 필터 옵션들 (선택)
  filter?: GroupV2ListFilter;
  includeStatuses?: GroupV2Status[];
  excludeStatuses?: GroupV2Status[];
}

// 모임 목록 조회 응답
export interface GetGroupsResponse {
  items: GroupListItemResponse[];
  nextCursor: number | null;
}

// 내 모임 목록 조회 요청 파라미터 (GET /api/v2/groups/me)
export interface GetMyGroupsPayload {
  type: 'current' | 'myPost' | 'past';
  cursor?: number;
  size: number;
  // v2 필터 옵션들 (선택)
  filter?: GroupV2ListFilter;
  includeStatuses?: GroupV2Status[];
  excludeStatuses?: GroupV2Status[];
  myStatuses?: GroupUserV2Status[];
}

// 내 모임 목록 조회 응답
export interface GetMyGroupsResponse {
  items: GroupListItemResponse[];
  nextCursor: number | null;
}

export interface PreUploadGroupImagePayload {
  images: File[];
}

export interface PreUploadGroupImageResponse {
  images: {
    imageKey: string;
    sortOrder: number;
    imageUrl440x240: string;
    imageUrl100x100: string;
  }[];
}

export interface CreateGroupPayload {
  title: string;
  location: string;
  locationDetail?: string | null;
  startTime: string;
  endTime?: string;
  tags?: string[] | null;
  description: string;
  maxParticipants: number;
  images?: {
    imageKey: string;
    sortOrder: number;
  }[];
  // v2 기준: FREE / APPROVAL_REQUIRED
  joinPolicy: GroupV2JoinPolicy;
}

export interface CreateGroupResponse {
  id: number;
  title: string;
  // v2 상태 타입
  status: GroupV2Status;
  address: {
    location: string;
    locationDetail: string;
  };
  startTime: string;
  endTime: string;
  tags: string[];
  description: string;
  participantCount: number;
  maxParticipants: number;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    userId: number;
    nickName: string;
    profileImage: string | null;
    profileMessage: string | null;
  };
  myMembership?: GroupV2Membership | null;
  images: {
    groupImageId: number;
    imageKey: string;
    sortOrder: number;
    variants: {
      variantId: number;
      type: 'CARD_440_240' | 'THUMBNAIL_100_100';
      width: number;
      height: number;
      format: 'WEBP';
      imageUrl: string;
    }[];
  }[];
}

export interface GetGroupDetailsResponse {
  id: number;
  title: string;
  joinPolicy: GroupV2JoinPolicy;
  status: GroupV2Status;
  address: {
    location: string;
    locationDetail: string;
  };
  startTime: string;
  endTime?: string | null;
  images: {
    groupImageId: number;
    imageKey: string;
    sortOrder: number;
    variants: {
      variantId: number;
      // v2 이미지 타입
      type: 'CARD_440_240' | 'THUMBNAIL_100_100';
      width: number;
      height: number;
      format: 'WEBP';
      imageUrl: string;
    }[];
  }[];
  tags: string[];
  description: string;
  participantCount: number;
  maxParticipants: number;
  createdBy: {
    userId: number;
    nickName: string;
    profileImage: string | null;
    profileMessage: string | null;
  };
  createdAt: string;
  updatedAt: string;
  myMembership?: GroupV2Membership | null;
  joinedMembers: {
    userId: number;
    role: 'HOST' | 'MANAGER' | 'MEMBER';
    status: GroupUserV2Status;
    nickName: string;
    profileImage: string | null;
    joinedAt: string;
    leftAt: string | null;
  }[];
}

export interface GroupIdParams {
  groupId: string;
}

export interface AttendGroupPayload {
  message: string;
}

export interface KickGroupMemberParams {
  groupId: GroupIdParams['groupId'];
  targetUserId: string;
}

// 승인 대기자 목록 조회 응답 (GET /api/v2/groups/{groupId}/attendance/pending)
export interface GetPendingMembersResponse {
  groupId: number;
  joinPolicy: GroupV2JoinPolicy;
  pendingMembers: {
    userId: number;
    groupUserId: number;
    nickName: string;
    profileImage: string | null;
    profileMessage: string | null;
    requestMessage: string | null;
    requestedAt: string;
  }[];
  serverTime: string;
}

export interface KickGroupMemberResponse {
  groupId: number;
  groupStatus: GroupV2Status;
  joinPolicy: GroupV2JoinPolicy;
  participantCount: number;
  maxParticipants: number;
  targetMembership: {
    userId: number;
    groupUserId: number;
    status: GroupUserV2Status;
  };
  serverTime: string;
}
