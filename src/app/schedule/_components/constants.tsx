import { type ReactNode } from 'react';

export type TabType = 'current' | 'myPost' | 'past';

const DEFAULT_BUTTON_WIDTH = 'w-31';

export const EMPTY_STATE_CONFIG: Record<
  TabType,
  { text: ReactNode; buttonText: string; buttonWidth: string }
> = {
  current: {
    text: (
      <>
        현재 참여 중인 모임이 없어요.
        <br />
        지금 바로 모임을 참여해보세요!
      </>
    ),
    buttonText: '모임 보러가기',
    buttonWidth: DEFAULT_BUTTON_WIDTH,
  },
  myPost: {
    text: (
      <>
        아직 생성한 모임이 없어요.
        <br />
        지금 바로 모임을 만들어보세요!
      </>
    ),
    buttonText: '모임 만들기',
    buttonWidth: DEFAULT_BUTTON_WIDTH,
  },
  past: {
    text: (
      <>
        아직 참여한 모임이 없어요.
        <br />
        마음에 드는 모임을 발견해보세요!
      </>
    ),
    buttonText: '모임 보러가기',
    buttonWidth: DEFAULT_BUTTON_WIDTH,
  },
} as const;
