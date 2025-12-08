import { User } from '@/types/service/user';

import {
  ProfileDescriptionBadge,
  ProfileDescriptionBadgeProps,
} from '../profile-description-badge';

const formatISO = (dateString: string) => {
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${d}`;
};

interface Props {
  user: User;
}

export const ProfileDescription = ({ user }: Props) => {
  const listMap: ProfileDescriptionBadgeProps[] = [
    {
      label: 'MBTI',
      iconId: 'symbol',
      value: user.mbti,
    },
    {
      label: '가입 일자',
      iconId: 'calendar-2',
      value: formatISO(user.createdAt),
    },
    {
      label: '모임 참여',
      iconId: 'users-2',
      value: `${user.joinedCount}회`,
    },
    {
      label: '모임 생성',
      iconId: 'map-pin-2',
      value: `${user.createdCount}회`,
    },
  ];

  return (
    <div className='bg-mono-white shadow-card mt-6 flex flex-col gap-5 rounded-3xl px-6 py-6.25'>
      {listMap.map((item) => (
        <ProfileDescriptionBadge key={item.label} badgeItems={item} />
      ))}
    </div>
  );
};
