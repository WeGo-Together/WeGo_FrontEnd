'use client';

import { MeetingList } from './meeting-list';
import type { Meeting } from './types';

const MOCK_MEETINGS: Meeting[] = [];

export default function History() {
  return (
    <MeetingList
      emptyStatePath='/'
      emptyStateType='history'
      meetings={MOCK_MEETINGS}
      showActions={false}
      tabType='history'
    />
  );
}
