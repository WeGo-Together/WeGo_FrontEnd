import { Fragment } from 'react/jsx-runtime';

import { User } from '@/types/service/user';

interface Props {
  user: User;
}

export const ProfileFollowsBadge = ({ user }: Props) => {
  const listMap = [
    {
      label: '팔로워',
      value: user.followersCnt.toLocaleString(),
    },
    {
      label: '팔로잉',
      value: user.followeesCnt.toLocaleString(),
    },
  ];

  const listLength = listMap.length;

  return (
    <div className='flex-center bg-mono-white shadow-card mb-4 rounded-3xl py-4'>
      {listMap.map((item, index) => (
        <Fragment key={item.label}>
          <div className='flex-col-center w-full gap-0.75 py-0.75'>
            <span className='text-text-xl-bold text-gray-800'>{item.value}</span>
            <span className='text-text-xs-medium text-gray-500'>{item.label}</span>
          </div>
          {index < listLength - 1 && <div className='h-10 w-1 border-r-1 border-gray-200' />}
        </Fragment>
      ))}
    </div>
  );
};
