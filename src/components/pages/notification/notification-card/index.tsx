import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';
import { Toast } from '@/components/ui';
import { useToast } from '@/components/ui/toast/core';
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
  const { run } = useToast();

  const NotificationIcon = IconMap[item.type];
  const title = getTitle(item);
  const description = getDescription(item);
  const timeAgo = getTimeAgo(item);
  const redirectUrl = getRedirectUrl(item);

  const handleNotificationClick = () => {
    try {
      mutateAsync(item.id);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        run(<Toast>이미 마감되었거나 삭제된 모임입니다.</Toast>);
      }
    } catch {}
  };

  return (
    <article
      className={cn(
        'bg-mono-white flex cursor-pointer flex-row gap-3 px-5 py-6',
        !item.readAt && 'bg-mint-50',
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
  follow: <Icon id='heart' className='text-mint-500 size-6' />,
  'group-join': <Icon id='symbol' className='text-mint-500 size-6' />,
  'group-leave': <Icon id='x-2' className='size-6 text-gray-500' />,
  'group-create': <Icon id='map-pin-2' className='size-6 text-[#FFBA1A]' />,
  'group-delete': <Icon id='x-2' className='size-6 text-gray-500' />,
  'group-join-request': <Icon id='send' className='text-mint-500 size-6' />,
  'group-join-approved': <Icon id='congratulate' className='size-6' />,
  'group-join-rejected': <Icon id='kick' className='size-6' />,
  'group-join-kicked': <Icon id='kick' className='size-6' />,
};

const getTitle = (data: NotificationItem) => {
  switch (data.type) {
    case 'follow':
      return `새 팔로워`;
    case 'group-join':
      return `모임 현황`;
    case 'group-leave':
      return `모임 현황`;
    case 'group-create':
      return `모임 생성`;
    case 'group-delete':
      return `모임 취소`;
    case 'group-join-request':
      return `모임 참여 신청`;
    case 'group-join-approved':
      return `모임 신청 승인`;
    case 'group-join-rejected':
      return `모임 신청 거절`;
    case 'group-join-kicked':
      return `모임 강퇴`;
  }
};

const getDescription = (data: NotificationItem) => {
  // user type 알림
  switch (data.type) {
    case 'follow':
      return `${data.user.nickname} 님이 팔로우했어요.`;
  }

  // group type 알림
  // 알림 필드 type 변경 전 데이터는 group 필드가 null로 조회되므로 fallback 처리
  if (!data.group) return data.message;

  // group 필드가 null이 아닐 경우
  switch (data.type) {
    case 'group-join':
      return `${data.user.nickname} 님이 "${data.group.title}" 모임에 참여했어요.`;
    case 'group-leave':
      return `${data.user.nickname} 님이 "${data.group.title}" 모임을 탈퇴했어요.`;
    case 'group-create':
      return `${data.user.nickname} 님이 "${data.group.title}" 모임을 생성했어요.`;
    case 'group-delete':
      return `${data.user.nickname} 님이 "${data.group.title}" 모임을 취소했어요.`;
    case 'group-join-request':
      return `${data.user.nickname} 님이 "${data.group.title}" 모임에 참여를 요청했어요.`;
    case 'group-join-approved':
      return `"${data.group.title}" 모임 참여 신청이 승인됐어요.`;
    case 'group-join-rejected':
      return `"${data.group.title}" 모임 참여 신청이 거절됐어요.`;
    case 'group-join-kicked':
      return `"${data.group.title}" 모임에서 퇴장됐어요.`;
  }
};

const getTimeAgo = (data: NotificationItem) => {
  const { createdAt } = data;
  return formatTimeAgo(createdAt);
};

const getRedirectUrl = (data: NotificationItem) => {
  // user type 알림
  switch (data.type) {
    case 'follow':
      return `/profile/${data.user.id}`;
  }

  // 알림 필드 type 변경 전 데이터는 group 필드가 null로 조회되므로 fallback 처리
  if (!data.group) return null;

  switch (data.type) {
    case 'group-join-request':
      return `/pending/${data.group.id}`;
    default:
      return `/group/${data.group.id}`;
  }
};
