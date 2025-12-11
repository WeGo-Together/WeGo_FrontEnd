'use client';

import { MeetingList } from './meeting-list';
import type { Meeting } from './types';

const MOCK_MEETINGS: Meeting[] = [
  {
    id: 1,
    title: '네즈코와 무한성에서 정모 하실 분',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: '네즈코 호수공원',
    dateTime: '25. 11. 28 - 10:00',
    nickName: 'Hope Lee',
    participantCount: 8,
    maxParticipants: 10,
    tags: ['#젠이츠', '#기유', '#네즈코'],
  },
];

export default function Current() {
  return (
    <MeetingList
      emptyStatePath='/'
      emptyStateType='current'
      leaveActionText='모임 탈퇴'
      meetings={MOCK_MEETINGS}
      showActions={true}
      tabType='current'
    />
  );
}
