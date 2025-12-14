'use client';

import { InfiniteData } from '@tanstack/react-query';

import { ErrorMessage } from '@/components/shared';
import Card from '@/components/shared/card';
import { useInfiniteGroupList } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { formatDateTime } from '@/lib/formatDateTime';
import { GetGroupsResponse } from '@/types/service/group';

interface GroupListProps {
  initialData?: InfiniteData<GetGroupsResponse, number | undefined>;
  initialKeyword?: string;
}

export default function GroupList({ initialData, initialKeyword }: GroupListProps) {
  const { items, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteGroupList({
    initialData,
    initialKeyword,
  });

  // IntersectionObserver를 통한 무한 스크롤 감지
  // React Query의 fetchNextPage를 트리거하는 역할만 수행
  const sentinelRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && error === null,
    threshold: INTERSECTION_OBSERVER_THRESHOLD,
  });

  return (
    <section className='min-h-screen bg-[#F1F5F9]'>
      <div className='flex w-full flex-col gap-4 px-4 py-4'>
        {error && items.length === 0 && (
          <ErrorMessage
            className='py-12'
            message={error.message}
            onRetry={() => window.location.reload()}
          />
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
          <ErrorMessage
            className='py-8'
            message={error.message}
            onRetry={() => window.location.reload()}
          />
        )}

        {/* sentinel 요소 생성: hasNextPage가 true이고 에러가 없으면 렌더 */}
        {hasNextPage && !error && <div ref={sentinelRef} className='h-1' />}

        {/* hasNextPage가 false이면 모든 데이터를 불러온 상태 */}
        {!hasNextPage && items.length > 0 && !error && (
          <div className='py-8 text-center text-gray-500'>모든 모임을 불러왔습니다.</div>
        )}
      </div>
    </section>
  );
}
