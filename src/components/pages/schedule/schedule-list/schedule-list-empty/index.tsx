import { useRouter } from 'next/navigation';

import { EmptyState } from '@/components/layout/empty-state';
import { Button } from '@/components/ui';

import { EMPTY_STATE_CONFIG, type TabType } from '../constants';

interface Props {
  emptyStateType: TabType;
  emptyStatePath: string;
}

export const ScheduleListEmpty = ({ emptyStateType, emptyStatePath }: Props) => {
  const router = useRouter();
  const config = EMPTY_STATE_CONFIG[emptyStateType];

  const handleEmptyStateClick = () => router.push(emptyStatePath);

  return (
    <div className={`flex-col-center relative min-h-[calc(100vh-156px)] py-8`}>
      <EmptyState>
        <p>{config.text}</p>
        <Button
          className={`bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700 mt-4.5 h-10 rounded-xl ${config.buttonWidth}`}
          onClick={handleEmptyStateClick}
        >
          {config.buttonText}
        </Button>
      </EmptyState>
    </div>
  );
};
