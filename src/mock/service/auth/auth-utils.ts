import type { LoginResponse, SignupResponse } from '@/types/service/auth';

import { AuthMockUser, authMockUsers } from './auth-mock';

const findUserByEmail = (email: string) => authMockUsers.find((user) => user.email === email);
const findUserByNickname = (nickName: string) =>
  authMockUsers.find((user) => user.nickName === nickName);

const findUserByCredentials = (email: string, password: string) =>
  authMockUsers.find((user) => user.email === email && user.password === password);

const createMockTokens = () => ({
  accessToken: 'mock-access-token',
  tokenType: 'Bearer' as const,
  expiresIn: 3600,
  expiresAt: '2026-02-21T11:05:19.595700269',
});

export const createLoginResponse = (email: string, password: string): LoginResponse => {
  const user = findUserByCredentials(email, password);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const tokens = createMockTokens();

  return {
    ...tokens,
    user: {
      userId: user.id,
      email: user.email,
      nickName: user.nickName,
    },
  };
};

export const createSignupResponse = (
  email: string,
  nickName: string,
  password: string,
): SignupResponse => {
  const newUser: AuthMockUser = {
    id: authMockUsers.length + 1,
    email,
    nickName,
    password,
    createdAt: new Date().toISOString(),
  };

  authMockUsers.push(newUser);

  return {
    id: newUser.id,
    email: newUser.email,
    nickName: newUser.nickName,
    createdAt: newUser.createdAt,
  };
};

export const isEmailTaken = (email: string) => !!findUserByEmail(email);
export const isNicknameTaken = (nickName: string) => !!findUserByNickname(nickName);
