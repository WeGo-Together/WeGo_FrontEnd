import { useRouter } from 'next/navigation';

import { EmptyState } from '@/components/layout/empty-state';
import { Button } from '@/components/ui';

import { EMPTY_STATE_CONFIG, SCHEDULE_MIN_HEIGHT, type TabType } from '../constants';

interface MeetingsEmptyProps {
  emptyStateType: TabType;
  emptyStatePath: string;
}

export const MeetingsEmpty = ({ emptyStateType, emptyStatePath }: MeetingsEmptyProps) => {
  const router = useRouter();
  const config = EMPTY_STATE_CONFIG[emptyStateType];

  const handleEmptyStateClick = () => router.push(emptyStatePath);

  return (
    <div className={`flex-col-center relative ${SCHEDULE_MIN_HEIGHT} py-8`}>
      <EmptyState>{config.text}</EmptyState>

      <Button
        className={`bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700 relative z-10 mt-62.5 h-10 rounded-xl ${config.buttonWidth}`}
        onClick={handleEmptyStateClick}
      >
        {config.buttonText}
      </Button>
    </div>
  );
};
