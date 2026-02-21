export interface SignupRequest {
  email: string;
  password: string;
  nickName: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  nickName: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  expiresAt: string;
  user: {
    userId: number;
    email: string;
    nickName: string;
  };
}

export interface RefreshResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  expiresAt: string;
}

export interface GoogleOAuthExchangeRequest {
  authorizationCode: string;
  redirectUri: string;
}

export interface GoogleOAuthExchangeResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  user: {
    userId: number;
    email: string;
    nickName: string;
    mbti: string | null;
    profileImage: string | null;
    profileMessage: string | null;
    followeesCnt: number;
    followersCnt: number;
    groupJoinedCnt: number;
    groupCreatedCnt: number;
    isNotificationEnabled: boolean;
    isFollow: boolean;
    createdAt: string;
  };
}
