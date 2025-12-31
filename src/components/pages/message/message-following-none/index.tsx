import { EmptyState } from '@/components/layout/empty-state';

export const FollowingNone = () => {
  return (
    <EmptyState>
      <span>아직 팔로우 한 사람이 없어요.</span>
      <span>마음에 드는 유저를 팔로우 해보세요!</span>
    </EmptyState>
  );
};
