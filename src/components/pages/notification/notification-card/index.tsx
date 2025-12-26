import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';
import { useUpdateNotificationRead } from '@/hooks/use-notification/use-notification-update-read';
import { formatTimeAgo } from '@/lib/formatDateTime';
import { cn } from '@/lib/utils';
import { NotificationItem, NotificationType } from '@/types/service/notification';

interface Props {
  item: NotificationItem;
}

export const NotificationCard = ({ item }: Props) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateNotificationRead();

  const NotificationIcon = IconMap[item.type];
  const title = getTitle(item);
  const description = getDescription(item);
  const timeAgo = getTimeAgo(item);

  const handleNotificationClick = () => {
    try {
      mutateAsync(item.id);

      router.push(`${item.redirectUrl}`);
    } catch {}
  };

  return (
    <article
      className={cn(
        'bg-mono-white flex cursor-pointer flex-row gap-3 px-5 py-6',
        !item.readAt && 'bg-mint-100',
      )}
      onClick={handleNotificationClick}
    >
      <div className={cn('flex-center mt-0.5 size-10 shrink-0 rounded-xl bg-gray-100')}>
        {NotificationIcon}
      </div>
      <div className='w-full'>
        <div className='flex flex-row justify-between'>
          <p className='text-text-md-bold mb-1 text-gray-800'>{title}</p>
          <span className='text-text-xs-medium text-gray-500'>{timeAgo}</span>
        </div>
        <p className='text-gray-600'>{description}</p>
      </div>
    </article>
  );
};

const IconMap: Record<NotificationType, React.ReactNode> = {
  FOLLOW: <Icon id='heart' className='text-mint-500 size-6' />,
  GROUP_CREATE: <Icon id='map-pin-2' className='size-6 text-[#FFBA1A]' />,
  GROUP_DELETE: <Icon id='x-2' className='size-6 text-gray-500' />,
  GROUP_JOIN: <Icon id='symbol' className='text-mint-500 size-6' />,
  EXIT: <Icon id='x-2' className='size-6 text-gray-500' />,
};

const getTitle = (data: NotificationItem) => {
  switch (data.type) {
    case 'FOLLOW':
      return `새 팔로워`;
    case 'GROUP_CREATE':
      return `모임 생성`;
    case 'GROUP_DELETE':
      return `모임 취소`;
    case 'GROUP_JOIN':
      return `모임 현황`;
    case 'EXIT':
      return `모임 현황`;
  }
};

const getDescription = (data: NotificationItem) => {
  // switch (data.type) {
  //   case 'FOLLOW':
  //     return `${data.actorNickname} 님이 팔로우 했습니다.`;
  //   case 'GROUP_CREATE':
  //     return `${data.actorNickname} 님이 "${data.actorNickname}" 모임을 생성했습니다.`;
  //   case 'CANCLE':
  //     return `${data.actorNickname} 님이 "${data.actorNickname}" 모임을 취소했습니다.`;
  //   case 'ENTER':
  //     return `${data.actorNickname} 님이 "${data.actorNickname}" 모임에 참가했습니다.`;
  //   case 'EXIT':
  //     return `${data.actorNickname} 님이 "${data.actorNickname}" 모임을 떠났습니다.`;
  // }
  return data.message;
};

const getTimeAgo = (data: NotificationItem) => {
  const { createdAt } = data;
  return formatTimeAgo(createdAt);
};
