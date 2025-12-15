import { DEFAULT_GROUP_IMAGE } from 'constants/default-images';

import { ImageWithFallback } from '@/components/ui';

type CardThumbnailProps = {
  title: string;
  thumbnail?: string;
};

export const CardThumbnail = ({ title, thumbnail }: CardThumbnailProps) => {
  return (
    <div className='relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-2xl bg-gray-200'>
      <ImageWithFallback
        width={100}
        className='h-full w-full object-cover'
        alt={title}
        fallbackSrc={DEFAULT_GROUP_IMAGE}
        height={100}
        src={thumbnail ?? ''}
        unoptimized
      />
    </div>
  );
};
