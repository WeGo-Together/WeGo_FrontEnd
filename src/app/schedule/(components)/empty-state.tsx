'use client';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
  type: 'current' | 'myPost' | 'past';
  onButtonClick: () => void;
};

const EMPTY_STATE_CONFIG = {
  current: {
    text: '현재 참여 중인 모임이 없어요.\n지금 바로 모임을 참여해보세요!',
    buttonText: '모임 보러가기',
    buttonWidth: 'w-[124px]',
  },
  myPost: {
    text: '아직 생성한 모임이 없어요.\n지금 바로 모임을 만들어보세요!',
    buttonText: '모임 만들기',
    buttonWidth: 'w-[112px]',
  },
  past: {
    text: '아직 참여한 모임이 없어요.\n마음에 드는 모임을 발견해보세요!',
    buttonText: '모임 보러가기',
    buttonWidth: 'w-[124px]',
  },
} as const;

export const EmptyState = ({ type, onButtonClick }: EmptyStateProps) => {
  const config = EMPTY_STATE_CONFIG[type];

  return (
    <div className='flex flex-col items-center pt-[202px]'>
      <Icon id='wego-logo' className='text-gray-500' size={85} />

      <div className='mt-5 text-center'>
        <p className='text-text-sm-medium whitespace-pre-line text-gray-600'>{config.text}</p>
      </div>

      <Button
        className={cn('text-text-sm-bold mt-[18px]', config.buttonWidth)}
        size='sm'
        variant='primary'
        onClick={onButtonClick}
      >
        {config.buttonText}
      </Button>
    </div>
  );
};
