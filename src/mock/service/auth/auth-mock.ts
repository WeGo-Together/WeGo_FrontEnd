export interface AuthMockUser {
  id: number;
  email: string;
  nickName: string;
  password: string;
  createdAt: string;
}

export const authMockUsers: AuthMockUser[] = [
  {
    id: 1,
    email: 'messi@test.com',
    nickName: '리오넬 메시',
    password: 'test9876',
    createdAt: '2025-01-30T12:00:00',
  },
  {
    id: 2,
    email: 'ronaldo@test.com',
    nickName: '크리스티아누 호날두',
    password: 'test1234',
    createdAt: '2025-01-30T12:00:00',
  },
  {
    id: 3,
    email: 'torres@test.com',
    nickName: '페르난도 토레스',
    password: '123456789',
    createdAt: '2025-01-30T12:00:00',
  },
];
