'use client';

import Image from 'next/image';

import { useState } from 'react';

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
}: CardProps) => {
  const safeMaxCount = maxParticipants > 0 ? maxParticipants : 1;
  const rawProgress = (participantCount / safeMaxCount) * 100;
  const progress = Math.min(100, Math.max(0, rawProgress));
  const [imageError, setImageError] = useState(false);

  const Wrapper: 'button' | 'div' = onClick ? 'button' : 'div';
  const thumbnail = images?.[0];
  const hasThumbnail = !!thumbnail && !imageError;
  const cardTags: CardTag[] = tags.map((tag, index) => ({ id: index, label: tag }));

  return (
    <Wrapper
      className={cn('bg-mono-white flex h-[162px] w-full rounded-3xl p-4 text-left shadow-sm')}
      type={onClick ? 'button' : undefined}
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
                width={16}
                className='rounded-full object-cover'
                alt={nickName}
                height={16}
                src={profileImage}
              />
            ) : (
              <div className='h-4 w-4 rounded-full bg-gray-600' />
            )}
            <span className='text-text-xs-medium text-gray-900'>{nickName}</span>
          </div>
        </div>

        <div className='flex min-w-0 flex-1 flex-col'>
          <h3 className='text-text-md-semibold w-full truncate text-gray-900'>{title}</h3>

          <CardTags tags={cardTags} />

          <div className='mt-3 flex flex-col gap-1'>
            <CardInfoRow iconId='map-pin' label={location} />
            <CardInfoRow iconId='calendar' label={dateTime} />
          </div>

          <CardParticipationRow
            maxParticipants={maxParticipants}
            participantCount={participantCount}
            progress={progress}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
