import { Group } from '@/types/service/group';

export const groupMockItem: Group[] = [
  {
    id: 1,
    title: '동탄 호수공원에서 피크닉하실 분!',
    location: '화성시',
    locationDetail: '동탄 호수공원',
    startTime: '2025-12-07T17:00:00+09:00',
    endTime: '2025-12-07T19:00:00+09:00',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: ['게임', '피크닉'],
    description: '동탄 호수공원에서 어쩌구 저쩌구',
    participantCount: 3,
    maxParticipants: 12,
    createdBy: {
      userId: 1,
      nickName: '리오넬 메시',
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    createdAt: '2025-12-06T17:00:00+09:00',
    updatedAt: '2025-12-06T17:00:00+09:00',
    joinedCount: 3,
  },
];
