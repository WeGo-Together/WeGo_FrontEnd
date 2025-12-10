import { User } from '@/types/service/user';

export const mockUserItems: User[] = [
  {
    userId: 1,
    email: 'test@example.com',
    nickName: '리오넬 메시',
    profileImage:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isNotificationEnabled: true,
    mbti: 'ISTJ',
    profileMessage: 'Zzz...',
    followeesCnt: 102356,
    followersCnt: 104,
    createdAt: '2025-12-07T17:00:00+09:00',
    groupJoinedCnt: 5,
    groupCreatedCnt: 3,
  },
  {
    userId: 2,
    email: 'test@example.com',
    nickName: '크리스티아누 호날두',
    profileImage:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isNotificationEnabled: false,
    mbti: 'ENFP',
    profileMessage: '안녕하세요',
    followeesCnt: 7056512,
    followersCnt: 134,
    createdAt: '2025-08-03T17:00:00+09:00',
    groupJoinedCnt: 5,
    groupCreatedCnt: 3,
  },
  {
    userId: 3,
    email: 'test@example.com',
    nickName: '페르난도 토레스',
    profileImage:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isNotificationEnabled: true,
    mbti: 'ESFJ',
    profileMessage: '반갑습니다',
    followeesCnt: 15,
    followersCnt: 12,
    createdAt: '2025-11-03T17:00:00+09:00',
    groupJoinedCnt: 2,
    groupCreatedCnt: 1,
  },
];
