'use client';

import Image from 'next/image';

import { useState } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

import { CardInfoRow } from './card-info-row';
import { CardParticipationRow } from './card-participation-row';
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
};

const PROFILE_IMAGE_SIZE = 16;

const calculateProgress = (count: number, max: number): number => {
  const safeMax = max > 0 ? max : 1;
  const rawProgress = (count / safeMax) * 100;
  return Math.min(100, Math.max(0, rawProgress));
};

const convertToCardTags = (tags: string[]): CardTag[] => {
  return tags.map((tag, index) => ({ id: index, label: tag }));
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
}: CardProps) => {
  const [imageError, setImageError] = useState(false);

  const thumbnail = images?.[0];
  const hasThumbnail = !!thumbnail && !imageError;
  const cardTags = convertToCardTags(tags);
  const progress = calculateProgress(participantCount, maxParticipants);

  return (
    <div
      className={cn(
        'bg-mono-white flex w-full rounded-3xl p-4 shadow-sm',
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <div className='flex min-w-0 gap-4'>
        <div className='flex flex-col'>
          <CardThumbnail
            hasThumbnail={hasThumbnail}
            thumbnail={thumbnail}
            title={title}
            onError={() => setImageError(true)}
          />

          <div className='mt-3 flex items-center gap-1.5'>
            {profileImage ? (
              <Image
                width={PROFILE_IMAGE_SIZE}
                className='rounded-full object-cover'
                alt={nickName}
                height={PROFILE_IMAGE_SIZE}
                src={profileImage}
              />
            ) : (
              <div
                className='rounded-full bg-gray-600'
                style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE }}
              />
            )}
            <span className='text-text-xs-medium text-gray-900'>{nickName}</span>
          </div>

          {leaveAndChatActions && (
            <Button
              className='mt-3'
              size='xs'
              variant='leave'
              onClick={(e) => {
                e.stopPropagation();
                leaveAndChatActions.onLeave();
              }}
            >
              모임 탈퇴
            </Button>
          )}
        </div>

        <div className='flex min-w-0 flex-1 flex-col'>
          <h3 className='text-text-md-semibold w-full truncate text-gray-900'>{title}</h3>

          <CardTags tags={cardTags} />

          <div className='mt-[13px] flex flex-col gap-1'>
            <CardInfoRow iconId='map-pin' label={location} />
            <CardInfoRow iconId='calendar' label={dateTime} />
          </div>

          <CardParticipationRow
            maxParticipants={maxParticipants}
            participantCount={participantCount}
            progress={progress}
          />

          {leaveAndChatActions && (
            <Button
              className='mt-3'
              size='xs'
              variant='chat'
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
