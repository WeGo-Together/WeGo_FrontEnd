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
