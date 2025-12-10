import Link from 'next/link';

import { Icon } from '@/components/icon';
import { formatTimeAgo } from '@/lib/format-time-ago';
import { Notification, NotificationType } from '@/types/service/notification';

interface Props {
  data: Notification;
}

export const NotificationCard = ({ data }: Props) => {
  const NotificationIcon = IconMap[data.type];
  const title = getTitle(data);
  const description = getDescription(data);
  const route = getRoute(data);
  const routeCaption = getRouteCaption(data);
  const timeAgo = getTimeAgo(data);
  return (
    <article className='bg-mono-white flex flex-row gap-3 px-5 py-6'>
      <div className='flex-center mt-0.5 size-10 shrink-0 rounded-xl bg-gray-100'>
        {NotificationIcon}
      </div>
      <div className='w-full'>
        <div className='flex flex-row justify-between'>
          <p className='text-text-md-bold mb-1 text-gray-800'>{title}</p>
          <span className='text-text-xs-medium text-gray-500'>{timeAgo}</span>
        </div>
        <p className='text-gray-600'>{description}</p>
        {route && (
          <Link href={route} className='text-mint-500'>
            {routeCaption}
          </Link>
        )}
      </div>
    </article>
  );
};

const IconMap: Record<NotificationType, React.ReactNode> = {
  follow: <Icon id='heart' className='text-mint-500 size-6' />,
  'group-create': <Icon id='map-pin-2' className='size-6 text-[#FFBA1A]' />,
  'group-delete': <Icon id='x-2' className='size-6 text-gray-500' />,
  'group-join': <Icon id='symbol' className='text-mint-500 size-6' />,
  'group-leave': <Icon id='x-2' className='size-6 text-gray-500' />,
};

const getTitle = (data: Notification) => {
  switch (data.type) {
    case 'follow':
      return `새 팔로워`;
    case 'group-create':
      return `모임 생성`;
    case 'group-delete':
      return `모임 취소`;
    case 'group-join':
      return `모임 현황`;
    case 'group-leave':
      return `모임 현황`;
  }
};

const getDescription = (data: Notification) => {
  switch (data.type) {
    case 'follow':
      return `${data.user.nickName} 님이 팔로우 했습니다.`;
    case 'group-create':
      return `${data.user.nickName} 님이 "${data.group?.title}" 모임을 생성했습니다.`;
    case 'group-delete':
      return `${data.user.nickName} 님이 "${data.group?.title}" 모임을 취소했습니다.`;
    case 'group-join':
      return `${data.user.nickName} 님이 "${data.group?.title}" 모임에 참가했습니다.`;
    case 'group-leave':
      return `${data.user.nickName} 님이 "${data.group?.title}" 모임을 떠났습니다.`;
  }
};

const getRoute = (data: Notification) => {
  switch (data.type) {
    case 'follow':
      return `/profile/${data.user.userId}`;
    case 'group-create':
      return `/profile/${data.user.userId}`;
    case 'group-delete':
      return ``;
    case 'group-join':
      return `/meetup/${data.group?.id}`;
    case 'group-leave':
      return ``;
  }
};

const getRouteCaption = (data: Notification) => {
  switch (data.type) {
    case 'follow':
      return `프로필 바로가기`;
    case 'group-create':
      return `프로필 바로가기`;
    case 'group-delete':
      return ``;
    case 'group-join':
      return `모임 바로가기`;
    case 'group-leave':
      return ``;
  }
};

const getTimeAgo = (data: Notification) => {
  const { createdAt } = data;
  return formatTimeAgo(createdAt);
};
