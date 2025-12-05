import { User } from '@/types/service/user';

export const mockUserItems: User[] = [
  {
    id: 1,
    email: 'test@example.com',
    nickName: '리오넬 메시',
    profileImage:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    notification_enabled: '1',
    mbti: 'ISTJ',
    phoneNumber: '010-1234-5678',
    profileMessage: 'Zzz...',
  },
  {
    id: 2,
    email: 'test@example.com',
    nickName: '크리스티아누 호날두',
    profileImage:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    notification_enabled: '2',
    mbti: 'ENFP',
    phoneNumber: '010-1234-5678',
    profileMessage: '안녕하세요',
  },
  {
    id: 3,
    email: 'test@example.com',
    nickName: '페르난도 토레스',
    profileImage:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    notification_enabled: '3',
    mbti: 'ESFJ',
    phoneNumber: '010-1234-5678',
    profileMessage: '반갑습니다',
  },
];
