import { EmptyState } from '@/components/layout/empty-state';

export const ChattingNone = () => {
  return (
    <EmptyState>
      <span>아직 받은 메세지가 없어요.</span>
    </EmptyState>
  );
};
