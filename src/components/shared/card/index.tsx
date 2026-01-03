'use client';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

import { CardInfoRow } from './card-info-row';
import { CardParticipationRow } from './card-participation-row';
import { CardProfile } from './card-profile';
import { type CardTag, CardTags } from './card-tags';
import { CardThumbnail } from './card-thumbnail';

type CardProps = {
  title: string;
  images?: string[];
  tags: string[];
  location: string;
  dateTime: string;
  nickName: string;
  participantCount: number;
  maxParticipants: number;
  profileImage?: string | null;
  onClick?: () => void;
  leaveAndChatActions?: {
    onLeave: () => void;
    onChat: () => void;
  };
  tabType?: 'current' | 'myPost' | 'past';
  isPending?: boolean;
  isFinished?: boolean;
  joinPolicy?: 'FREE' | 'APPROVAL_REQUIRED';
  isHost?: boolean;
};

const calculateProgress = (count: number, max: number): number => {
  const safeMax = max > 0 ? max : 1;
  const rawProgress = (count / safeMax) * 100;
  return Math.min(100, Math.max(0, rawProgress));
};

const convertToCardTags = (tags: string[]): CardTag[] => {
  return tags.map((tag, index) => ({ id: index, label: tag }));
};

const getLeaveButtonText = (
  tabType?: 'current' | 'myPost' | 'past',
  isHost?: boolean,
  isPending?: boolean,
): string => {
  if (tabType === 'myPost' || (tabType === 'current' && isHost)) {
    return '모임 취소';
  }

  if (tabType === 'current' && isPending) {
    return '신청 취소';
  }

  return '모임 탈퇴';
};

const Card = ({
  title,
  images,
  tags,
  location,
  dateTime,
  nickName,
  participantCount,
  maxParticipants,
  profileImage,
  onClick,
  leaveAndChatActions,
  tabType,
  isPending,
  isFinished,
  isHost,
}: CardProps) => {
  const thumbnail = images?.[0];
  const cardTags = convertToCardTags(tags);
  const progress = calculateProgress(participantCount, maxParticipants);
  const shouldShowButtons = leaveAndChatActions && tabType !== 'past';
  const leaveButtonText = getLeaveButtonText(tabType, isHost, isPending);

  return (
    <div
      className={cn(
        'bg-mono-white flex w-full rounded-3xl p-4 shadow-sm',
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <div className='flex min-w-0 gap-4'>
        <div className='flex flex-col justify-between'>
          <CardThumbnail
            isFinished={isFinished}
            isPending={isPending}
            thumbnail={thumbnail}
            title={title}
          />

          <div className='flex flex-1 items-center'>
            <CardProfile nickName={nickName} profileImage={profileImage} />
          </div>

          {shouldShowButtons && (
            <Button
              className='mt-3'
              size='sm'
              variant='tertiary'
              onClick={(e) => {
                e.stopPropagation();
                leaveAndChatActions.onLeave();
              }}
            >
              {leaveButtonText}
            </Button>
          )}
        </div>

        <div className='flex min-w-0 flex-1 flex-col justify-between'>
          <div>
            <h3 className='text-text-md-semibold w-full truncate text-gray-900'>{title}</h3>

            <CardTags tags={cardTags} />

            <div className='mt-3.25 flex flex-col gap-1'>
              <CardInfoRow iconId='map-pin-1' label={location} />
              <CardInfoRow iconId='calendar-1' label={dateTime} />
            </div>

            <CardParticipationRow
              maxParticipants={maxParticipants}
              participantCount={participantCount}
              progress={progress}
            />
          </div>

          {shouldShowButtons && (
            <Button
              className='mt-3'
              size='sm'
              variant='primary'
              onClick={(e) => {
                e.stopPropagation();
                leaveAndChatActions.onChat();
              }}
            >
              채팅 입장
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
