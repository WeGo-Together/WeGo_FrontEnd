import { Icon, IconId } from '@/components/icon';
import { cn } from '@/lib/utils';
import { User } from '@/types/service/user';

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
  const listMap: {
    label: string;
    iconId: IconId;
    value: string;
  }[] = [
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
      value: `${user.groupJoinedCnt}회`,
    },
    {
      label: '모임 생성',
      iconId: 'map-pin-2',
      value: `${user.groupCreatedCnt}회`,
    },
  ];

  const PLACEHOLDER = '-';

  return (
    <div className='bg-mono-white mt-6 flex flex-col gap-5 rounded-3xl px-6 py-6.25 shadow-md'>
      {listMap.map((item) => (
        <div key={item.label} className='flex flex-row items-center gap-4'>
          <div className='flex-center size-10 rounded-xl bg-gray-100'>
            <Icon id={item.iconId} className='text-mint-500 size-6' />
          </div>
          <div className='flex flex-col'>
            <span className='text-text-xs-medium text-gray-500'>{item.label}</span>
            <span
              className={cn(
                'text-text-md-semibold h-6 text-gray-700',
                !item.value && 'text-text-md-regular text-gray-500',
              )}
            >
              {item.value || PLACEHOLDER}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
