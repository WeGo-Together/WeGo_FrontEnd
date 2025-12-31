import { DEFAULT_GROUP_IMAGE } from 'constants/default-images';

import { ImageWithFallback, PendingBadge } from '@/components/ui';

type CardThumbnailProps = {
  title: string;
  thumbnail?: string;
  isPending?: boolean;
  isClosed?: boolean;
};

export const CardThumbnail = ({ title, thumbnail, isPending, isClosed }: CardThumbnailProps) => {
  return (
    <div className='relative h-25 w-25 shrink-0 overflow-hidden rounded-2xl bg-gray-200'>
      <ImageWithFallback
        width={100}
        className='h-full w-full object-cover'
        alt={title}
        fallbackSrc={DEFAULT_GROUP_IMAGE}
        height={100}
        src={thumbnail ?? ''}
        unoptimized
      />
      {isPending && (
        <div className='absolute top-1.5 left-1.5'>
          <PendingBadge variant='sm'>대기중</PendingBadge>
        </div>
      )}
      {isClosed && (
        <>
          <div className='absolute inset-0 bg-black/60' />
          <div className='flex-center absolute inset-0'>
            <span className='text-text-sm-bold text-mono-white'>모임 마감</span>
          </div>
        </>
      )}
    </div>
  );
};
