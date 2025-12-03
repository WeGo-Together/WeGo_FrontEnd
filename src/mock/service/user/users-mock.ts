import { User } from '@/types/service/user';

export const mockUserItems: User[] = [
  {
    id: 1,
    email: 'test@example.com',
    nickName: '리오넬 메시',
    profileImage: 'https://cdn.myapp.com/user/profile/123.png',
    notification_enabled: '1',
    mbti: 'ISTJ',
    phoneNumber: '010-1234-5678',
    profileMessage: 'Zzz...',
  },
  {
    id: 2,
    email: 'test@example.com',
    nickName: '크리스티아누 호날두',
    profileImage: 'https://cdn.myapp.com/user/profile/123.png',
    notification_enabled: '2',
    mbti: 'ENFP',
    phoneNumber: '010-1234-5678',
    profileMessage: '안녕하세요',
  },
  {
    id: 3,
    email: 'test@example.com',
    nickName: '페르난도 토레스',
    profileImage: 'https://cdn.myapp.com/user/profile/123.png',
    notification_enabled: '3',
    mbti: 'ESFJ',
    phoneNumber: '010-1234-5678',
    profileMessage: '반갑습니다',
  },
];
