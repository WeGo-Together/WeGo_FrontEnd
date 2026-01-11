import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { useModal } from '@/components/ui';
import { followKeys } from '@/lib/query-key/query-key-follow';
import { FollowType } from '@/types/service/follow';
import { User } from '@/types/service/user';

import { ProfileFollowsModal } from '../profile-follows-modal';

interface Props {
  user: User;
}

export const ProfileFollowsBadge = ({ user }: Props) => {
  const { open } = useModal();

  const queryClient = useQueryClient();

  const listMap: {
    label: string;
    type: FollowType;
    value: string;
  }[] = [
    {
      label: '팔로워',
      type: 'followers',
      value: user.followersCnt.toLocaleString(),
    },
    {
      label: '팔로잉',
      type: 'followees',
      value: user.followeesCnt.toLocaleString(),
    },
  ];

  const listLength = listMap.length;

  const handleFollowsBadgeClick = (type: FollowType) => {
    open(<ProfileFollowsModal type={type} user={user} />);
  };

  // 팔로워/팔로우 모달 정보를 미리 불러옴
  useEffect(() => {
    const prefetch = async () => {
      await Promise.all([
        queryClient.prefetchInfiniteQuery({
          queryFn: () => API.followerService.getFollowerList({ userId: user.userId }),
          queryKey: followKeys.followers(user.userId),
          initialPageParam: undefined,
        }),
        queryClient.prefetchInfiniteQuery({
          queryFn: () => API.followerService.getFolloweeList({ userId: user.userId }),
          queryKey: followKeys.followees(user.userId),
          initialPageParam: undefined,
        }),
      ]);
    };
    prefetch();
  }, [queryClient, user.userId]);

  return (
    <div className='flex-center bg-mono-white mb-4 rounded-3xl py-4 shadow-sm'>
      {listMap.map((item, index) => (
        <Fragment key={item.label}>
          <button
            className='flex-col-center group mx-4 w-full cursor-pointer gap-0.75 py-0.75'
            onClick={() => handleFollowsBadgeClick(item.type)}
          >
            <span className='text-text-xl-bold group-hover:text-mint-500 text-gray-800 transition-colors duration-300'>
              {item.value}
            </span>
            <span className='text-text-xs-medium text-gray-500'>{item.label}</span>
          </button>
          {index < listLength - 1 && <div className='h-10 w-1 border-r-1 border-gray-200' />}
        </Fragment>
      ))}
    </div>
  );
};
