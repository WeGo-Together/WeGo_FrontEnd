import { EmptyState } from '@/components/layout/empty-state';

export const FollowingNone = () => {
  return (
    <div className='mt-60 flex flex-col items-center gap-2 text-gray-600'>
      <EmptyState />
      <span>아직 팔로우 한 사람이 없어요.</span>
      <span>마음에 드는 유저를 팔로우 해보세요!</span>
    </div>
  );
};
