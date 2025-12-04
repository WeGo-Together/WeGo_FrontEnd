interface Props {
  progress: {
    current: number;
    max: number;
  };
  createdAt: string;
}

export const DescriptionProgress = ({ progress: { current, max }, createdAt }: Props) => {
  const progressRate = Math.ceil((current / max) * 100);

  return (
    <div className='mt-6'>
      <div className='rounded-2xl border border-gray-300 bg-gray-50 px-4 py-[14px]'>
        <div className='flex-between'>
          <p className='text-text-xs-medium text-gray-700'>참여 인원</p>
          <span className='text-mint-600 text-text-xs-semibold'>
            {current}/{max}
          </span>
        </div>
        <div className='h-2 w-full overflow-hidden rounded-full bg-gray-300'>
          <span className='bg-mint-500 block h-2' style={{ width: `${progressRate}%` }} />
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-text-xs-medium text-right text-gray-500'>{createdAt}</p>
      </div>
    </div>
  );
};
