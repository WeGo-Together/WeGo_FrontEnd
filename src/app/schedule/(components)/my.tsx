'use client';

import { MeetingList } from './meeting-list';
import type { Meeting } from './types';

const MOCK_MEETINGS: Meeting[] = [
  {
    id: 2,
    title: '주말 러닝 크루 모집',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: '한강공원 잠실지구',
    dateTime: '25. 12. 05 - 07:30',
    nickName: 'Minseo Kim',
    participantCount: 5,
    maxParticipants: 12,
    tags: ['#러닝', '#아침운동'],
  },
];

export default function My() {
  return (
    <MeetingList
      emptyStatePath='/post-meetup'
      emptyStateType='myPost'
      leaveActionText='모임 취소'
      meetings={MOCK_MEETINGS}
      showActions={true}
      tabType='myPost'
    />
  );
}
