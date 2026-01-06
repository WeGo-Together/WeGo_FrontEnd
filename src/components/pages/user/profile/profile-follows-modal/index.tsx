import Link from 'next/link';

import { Suspense } from 'react';

import { UseSuspenseInfiniteQueryResult } from '@tanstack/react-query';

import {
  ImageWithFallback,
  ModalContent,
  ModalDescription,
  ModalTitle,
  useModal,
} from '@/components/ui';
import { useGetFolloweesInfinite, useGetFollowersInfinite } from '@/hooks/use-follower';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { CommonErrorResponse } from '@/types/service/common';
import { FollowItem, FollowType } from '@/types/service/follow';
import { User } from '@/types/service/user';

interface Props {
  user: User;
  type: FollowType;
}

export const ProfileFollowsModal = ({ user, type }: Props) => {
  const title: Record<FollowType, string> = {
    followers: '팔로워',
    followees: '팔로잉',
  };

  const followsCount: Record<FollowType, number> = {
    followers: user.followersCnt,
    followees: user.followeesCnt,
  };

  return (
    <ModalContent className='max-w-90'>
      <ModalTitle className='flex flex-row gap-1'>
        <span>{title[type]}</span>
        <span className='text-mint-500'>{followsCount[type]}</span>
      </ModalTitle>
      <ModalDescription className='sr-only'>
        {`${title[type]} 목록을 확인할 수 있는 모달입니다.`}
      </ModalDescription>
      {/* todo: suspense fallback 디자인 필요 */}
      <Suspense fallback={<span>로딩중...</span>}>
        {type === 'followers' && <Followers user={user} />}
        {type === 'followees' && <Followees user={user} />}
      </Suspense>
    </ModalContent>
  );
};

const Followers = ({ user }: { user: User }) => {
  const query = useGetFollowersInfinite({ userId: user.userId });
  return <FollowList query={query} />;
};

const Followees = ({ user }: { user: User }) => {
  const query = useGetFolloweesInfinite({ userId: user.userId });
  return <FollowList query={query} />;
};

const FollowList = ({
  query,
}: {
  query: UseSuspenseInfiniteQueryResult<FollowItem[], CommonErrorResponse>;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = query;
  const { close } = useModal();

  const fetchObserverRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className='scrollbar-thin mt-4 flex h-96 flex-col overflow-y-scroll'>
      {data?.map((item) => (
        <Link
          key={item.userId}
          href={`/profile/${item.userId}`}
          className='flow-row flex gap-4 py-2'
          onClick={close}
        >
          <ImageWithFallback
            width={48}
            className='aspect-square rounded-full'
            alt='프로필 이미지'
            height={48}
            src={item.profileImage}
          />
          <div>
            <p className='text-text-md-bold text-gray-800'>{item.nickname}</p>
            <p className='text-text-sm-medium text-gray-600'>{item.profileMessage}</p>
          </div>
        </Link>
      ))}
      {hasNextPage && <div ref={fetchObserverRef}>다음</div>}
    </div>
  );
};
