'use client';

import { MeetingList } from './meeting-list';
import type { Meeting } from './types';

const MOCK_MEETINGS: Meeting[] = [
  {
    id: 2,
    title: '주말 러닝 크루 모집',
    images: [],
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
      emptyStateType='my'
      leaveActionText='모임 취소'
      meetings={MOCK_MEETINGS}
      showActions={true}
      tabType='my'
    />
  );
}
