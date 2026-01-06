import { PENDING_MEMBERS_MIN_HEIGHT } from '../constants';

const SKELETON_ITEMS_COUNT = 3;

export const PendingMembersSkeleton = () => {
  const skeletons = Array.from({ length: SKELETON_ITEMS_COUNT });

  return (
    <section className={`relative ${PENDING_MEMBERS_MIN_HEIGHT} px-4 pt-5 pb-5`}>
      <ul className='animate-pulse space-y-4'>
        {skeletons.map((_, index) => (
          <li key={index}>
            <div className='bg-mono-white rounded-3xl px-5 py-[26px] shadow-sm'>
              <div className='flex gap-3'>
                <div className='h-10 w-10 shrink-0 rounded-full bg-gray-200' />
                <div className='flex-1'>
                  <div className='h-5 w-24 rounded bg-gray-200' />
                  <div className='mt-2 h-4 w-32 rounded bg-gray-200' />
                </div>
              </div>
              <div className='mt-4 h-4 w-full rounded bg-gray-200' />
              <div className='mt-3 h-4 w-2/3 rounded bg-gray-200' />
              <div className='mt-4 flex gap-2'>
                <div className='h-10 w-full rounded-xl bg-gray-200' />
                <div className='h-10 w-full rounded-xl bg-gray-200' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
