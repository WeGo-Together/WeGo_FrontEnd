interface CardSkeletonProps {
  showButtons: boolean;
}

export const CardSkeleton = ({ showButtons }: CardSkeletonProps) => {
  return (
    <div className='bg-mono-white flex w-full animate-pulse rounded-3xl p-4 shadow-sm'>
      <div className='flex w-full min-w-0 gap-4'>
        <div className='flex flex-col justify-between'>
          <div className='h-32 w-32 rounded-xl bg-gray-200' />
          <div className='mt-3 flex items-center gap-2'>
            <div className='h-6 w-6 rounded-full bg-gray-200' />
            <div className='h-4 w-16 rounded bg-gray-200' />
          </div>
          {showButtons && <div className='mt-3 h-10 w-auto min-w-[80px] rounded-xl bg-gray-200' />}
        </div>

        <div className='flex min-w-0 flex-1 flex-col justify-between'>
          <div>
            <div className='mb-2 h-6 w-3/4 rounded bg-gray-200' />

            <div className='mb-3 flex gap-2'>
              <div className='h-5 w-16 rounded-full bg-gray-200' />
              <div className='h-5 w-16 rounded-full bg-gray-200' />
            </div>

            <div className='mb-3 flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded bg-gray-200' />
                <div className='h-4 w-32 rounded bg-gray-200' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded bg-gray-200' />
                <div className='h-4 w-40 rounded bg-gray-200' />
              </div>
            </div>

            <div className='h-2 w-full rounded-full bg-gray-200' />
          </div>

          {showButtons && <div className='mt-3 h-10 w-auto min-w-[88px] rounded-xl bg-gray-200' />}
        </div>
      </div>
    </div>
  );
};
