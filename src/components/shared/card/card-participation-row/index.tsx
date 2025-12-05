import { Icon } from '../../../icon';

type CardParticipationRowProps = {
  participantCount: number;
  maxParticipants: number;
  progress: number;
};

export const CardParticipationRow = ({
  participantCount,
  maxParticipants,
  progress,
}: CardParticipationRowProps) => {
  return (
    <div className='mt-3 flex h-[18px] items-center'>
      <div className='flex min-w-0 flex-1 items-center gap-1.5'>
        <Icon id='users' width={12} className='shrink-0 text-gray-600' height={12} />
        <div className='h-[6px] w-[200px] overflow-hidden rounded-full bg-gray-200 sm:w-[210px]'>
          <div
            className='bg-mint-400 h-full rounded-full transition-all duration-500 ease-out will-change-[width]'
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className='text-text-2xs-medium text-mint-500 shrink-0 whitespace-nowrap'>
          {participantCount}/{maxParticipants}
        </span>
      </div>
    </div>
  );
};
