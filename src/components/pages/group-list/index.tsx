'use client';

import { ErrorMessage } from '@/components/shared';
import Card from '@/components/shared/card';
import { useInfiniteGroupList } from '@/hooks/use-group/use-infinite-group-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { formatDateTime } from '@/lib/formatDateTime';
import { GroupListItemResponse } from '@/types/service/group';

interface GroupListProps {
  initialCursor: number | null;
  initialItems: GroupListItemResponse[];
  initialKeyword?: string;
}

export default function GroupList({ initialCursor, initialItems, initialKeyword }: GroupListProps) {
  const { items, nextCursor, error, fetchNext, handleRetry } = useInfiniteGroupList({
    initialCursor,
    initialItems,
    initialKeyword,
  });

  // IntersectionObserver를 통한 무한 스크롤 감지
  const sentinelRef = useIntersectionObserver({
    onIntersect: fetchNext,
    enabled: nextCursor !== null && error === null,
    threshold: INTERSECTION_OBSERVER_THRESHOLD,
  });

  return (
    <main className='min-h-screen bg-[#F1F5F9]'>
      <section className='flex w-full flex-col gap-4 px-4 py-4'>
        {error && items.length === 0 && (
          <ErrorMessage className='py-12' message={error.message} onRetry={handleRetry} />
        )}

        {items.length === 0 && !error ? (
          <div className='py-8 text-center text-gray-500'>모임이 없습니다.</div>
        ) : (
          items.map((meeting) => (
            <Card
              key={meeting.id}
              dateTime={formatDateTime(meeting.startTime, meeting.endTime)}
              images={meeting.images}
              location={meeting.location}
              maxParticipants={meeting.maxParticipants}
              nickName={meeting.createdBy.nickName}
              participantCount={meeting.participantCount}
              profileImage={meeting.createdBy.profileImage}
              tags={meeting.tags}
              title={meeting.title}
            />
          ))
        )}

        {error && items.length > 0 && (
          <ErrorMessage className='py-8' message={error.message} onRetry={handleRetry} />
        )}

        {/* sentinel 요소 생성: nextCursor가 null이거나 에러가 있으면 미렌더 */}
        {nextCursor !== null && !error && <div ref={sentinelRef} className='h-1' />}

        {/* nextCursor가 null이면 모든 데이터를 불러온 상태 */}
        {nextCursor === null && items.length > 0 && !error && (
          <div className='py-8 text-center text-gray-500'>모든 모임을 불러왔습니다.</div> // 이후 수정 예정
        )}
      </section>
    </main>
  );
}
