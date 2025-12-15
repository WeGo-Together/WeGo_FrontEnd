import { ImageWithFallback } from '@/components/ui';

type CardProfileProps = {
  nickName: string;
  profileImage?: string | null;
  size?: number;
};

const DEFAULT_SIZE = 16;

export const CardProfile = ({ nickName, profileImage, size = DEFAULT_SIZE }: CardProfileProps) => {
  return (
    <div className='mt-3 flex items-center gap-1.5'>
      <div
        className='relative shrink-0 overflow-hidden rounded-full'
        style={{ width: size, height: size }}
      >
        <ImageWithFallback className='object-cover' alt={nickName} fill src={profileImage || ''} />
      </div>
      <span className='text-text-xs-medium text-gray-900'>{nickName}</span>
    </div>
  );
};
