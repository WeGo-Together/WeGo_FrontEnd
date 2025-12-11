'use client';

import { MeetingList } from './meeting-list';
import type { Meeting } from './types';

const MOCK_MEETINGS: Meeting[] = [];

export default function History() {
  return (
    <MeetingList
      emptyStatePath='/'
      emptyStateType='past'
      meetings={MOCK_MEETINGS}
      showActions={false}
      tabType='past'
    />
  );
}
