import { GroupImage } from '@/components/shared/group-image';
import { PendingBadge } from '@/components/ui';

type CardThumbnailProps = {
  title: string;
  thumbnail?: string | null;
  isPending?: boolean;
  isFinished?: boolean;
};

export const CardThumbnail = ({ thumbnail, isPending, isFinished }: CardThumbnailProps) => {
  return (
    <div className='relative size-25 shrink-0'>
      <GroupImage size='lg' src={thumbnail ?? null} />

      {isPending && (
        <div className='absolute top-1.5 left-1.5'>
          <PendingBadge variant='sm'>대기중</PendingBadge>
        </div>
      )}
      {isFinished && (
        <div className='flex-center absolute inset-0 rounded-2xl bg-black/60'>
          <span className='text-text-sm-bold text-mono-white'>모임 마감</span>
        </div>
      )}
    </div>
  );
};
