import { useRouter } from 'next/navigation';

import { EmptyState } from '@/components/layout/empty-state';
import { Button } from '@/components/ui';
import {
  GROUP_LIST_CREATE_BUTTON_WIDTH,
  GROUP_LIST_EMPTY_BUTTON_TOP_MARGIN,
  GROUP_LIST_EMPTY_MIN_HEIGHT,
} from '@/lib/constants/group-list';

export const GroupListEmpty = () => {
  const router = useRouter();

  return (
    <div
      className={`relative flex ${GROUP_LIST_EMPTY_MIN_HEIGHT} flex-col items-center justify-center py-8`}
    >
      <EmptyState>
        아직 모임이 없어요.
        <br />
        지금 바로 모임을 만들어보세요!
      </EmptyState>

      <Button
        className={`bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700 relative z-10 ${GROUP_LIST_EMPTY_BUTTON_TOP_MARGIN} h-10 ${GROUP_LIST_CREATE_BUTTON_WIDTH} rounded-xl`}
        onClick={() => router.push('/create-group')}
      >
        모임 만들기
      </Button>
    </div>
  );
};
