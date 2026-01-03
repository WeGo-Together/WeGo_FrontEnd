'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { InfiniteData } from '@tanstack/react-query';

import { EmptyState } from '@/components/layout/empty-state';
import { ErrorMessage } from '@/components/shared';
import Card from '@/components/shared/card';
import { Button } from '@/components/ui';
import { useInfiniteGroupList } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { formatDateTime } from '@/lib/formatDateTime';
import { GetGroupsResponse } from '@/types/service/group';

interface GroupListProps {
  initialData?: InfiniteData<GetGroupsResponse, number | undefined>;
  initialKeyword?: string;
}

const SearchResultCount = ({ keyword, count }: { keyword: string; count: number }) => (
  <div className='mt-4 flex h-5 items-center pl-2'>
    <span className='text-text-sm-medium text-mint-600'>{keyword}</span>
    <span className='text-text-sm-medium ml-1 text-gray-800'>검색결과</span>
    <span className='text-text-sm-medium text-mint-600 ml-1'>{count}</span>
    <span className='text-text-sm-medium text-gray-800'>개</span>
  </div>
);

export default function GroupList({ initialData, initialKeyword }: GroupListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword') || undefined;
  const keyword = initialKeyword ?? keywordFromUrl;

  const { items, error, fetchNextPage, hasNextPage, isFetchingNextPage, completedMessage } =
    useInfiniteGroupList({
      initialData,
      initialKeyword: keyword,
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

  const hasKeyword = Boolean(keyword);
  const hasNoItems = items.length === 0 && !error;

  return (
    <section className='min-h-[calc(100vh-168px)] bg-[#F1F5F9]'>
      <div className='flex w-full flex-col px-4'>
        {error && items.length === 0 && (
          <div className='py-4'>
            <ErrorMessage
              className='py-12'
              message={error.message}
              onRetry={() => window.location.reload()}
            />
          </div>
        )}

        {hasKeyword && keyword && <SearchResultCount keyword={keyword} count={items.length} />}

        {!hasKeyword && hasNoItems && (
          <div className='relative flex min-h-[calc(100vh-200px)] flex-col items-center justify-center py-8'>
            <EmptyState>
              아직 모임이 없어요.
              <br />
              지금 바로 모임을 만들어보세요!
            </EmptyState>

            <Button
              className='bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700 relative z-10 mt-[250px] h-10 w-[112px] rounded-xl'
              onClick={() => router.push('/create-group')}
            >
              모임 만들기
            </Button>
          </div>
        )}

        {hasKeyword && hasNoItems && (
          <div className='relative mt-[174px] flex h-[200px] flex-col items-center justify-center'>
            <EmptyState>검색 결과가 없어요.</EmptyState>
          </div>
        )}

        {items.length > 0 && (
          <div className={`flex w-full flex-col gap-4 ${hasKeyword ? 'mt-3' : 'py-4'}`}>
            {items.map((meeting) => (
              <Card
                key={meeting.id}
                dateTime={formatDateTime(meeting.startTime)}
                images={meeting.images}
                isFinished={meeting.status === 'FINISHED'}
                isPending={meeting.myMembership?.status === 'PENDING'}
                location={meeting.location}
                maxParticipants={meeting.maxParticipants}
                nickName={meeting.createdBy.nickName}
                participantCount={meeting.participantCount}
                profileImage={meeting.createdBy.profileImage}
                tags={meeting.tags}
                title={meeting.title}
                onClick={() => router.push(`/group/${meeting.id}`)}
              />
            ))}
          </div>
        )}

        {error && items.length > 0 && (
          <div className='py-4'>
            <ErrorMessage
              className='py-8'
              message={error.message}
              onRetry={() => window.location.reload()}
            />
          </div>
        )}

        {/* sentinel 요소 생성: hasNextPage가 true이고 에러가 없으면 렌더 */}
        {hasNextPage && !error && items.length > 0 && <div ref={sentinelRef} className='h-1' />}

        {/* hasNextPage가 false이면 모든 데이터를 불러온 상태 */}
        {!hasNextPage && items.length > 0 && !error && (
          <div className='py-8 text-center text-gray-500'>{completedMessage}</div>
        )}
      </div>
    </section>
  );
}
