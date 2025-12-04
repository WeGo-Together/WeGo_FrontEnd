import Image from 'next/image';

type CardThumbnailProps = {
  title: string;
  thumbnail?: string;
  hasThumbnail: boolean;
  onError: () => void;
};

export const CardThumbnail = ({ title, thumbnail, hasThumbnail, onError }: CardThumbnailProps) => {
  return (
    <div className='relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-2xl bg-gray-200'>
      {hasThumbnail && thumbnail ? (
        <Image
          width={100}
          className='h-full w-full object-cover'
          alt={title}
          height={100}
          src={thumbnail}
          unoptimized
          onError={onError}
        />
      ) : null}
    </div>
  );
};
