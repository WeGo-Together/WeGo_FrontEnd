import { NotificationItem } from '@/types/service/notification';

export const mockNotificationItems: NotificationItem[] = [
  {
    id: 1,
    message: 'A 님이 팔로우했습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'follow',
    user: {
      id: 1,
      nickname: 'A',
    },
    group: null,
  },
  {
    id: 2,
    message: 'B님이 "A가 만든 모임" 모임에 참가했습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-join',
    user: {
      id: 1,
      nickname: 'B',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
  {
    id: 3,
    message: 'B님이 "A가 만든 모임" 모임을 탈퇴했습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-leave',
    user: {
      id: 1,
      nickname: 'B',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
  {
    id: 4,
    message: 'A님이 "A가 만든 모임" 모임을 생성했습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-create',
    user: {
      id: 1,
      nickname: 'A',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
  {
    id: 5,
    message: 'A님이 "A가 만든 모임" 모임을 취소했습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-delete',
    user: {
      id: 1,
      nickname: 'A',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
  {
    id: 6,
    message: 'B님이 "A가 만든 모임" 모임에 참여 신청했습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-join-request',
    user: {
      id: 1,
      nickname: 'B',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
  {
    id: 7,
    message: '"A가 만든 모임" 모임 참여 신청이 승인되었습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-join-approved',
    user: {
      id: 1,
      nickname: 'A',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
  {
    id: 8,
    message: '"A가 만든 모임" 모임 참여 신청이 거절되었습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-join-rejected',
    user: {
      id: 1,
      nickname: 'A',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
  {
    id: 9,
    message: '"A가 만든 모임" 모임에서 추방되었습니다.',
    readAt: null,
    createdAt: '2025-12-25T08:10:38.747958',
    type: 'group-join-kicked',
    user: {
      id: 1,
      nickname: 'A',
    },
    group: {
      id: 1,
      title: 'A가 만든 모임',
    },
  },
];
