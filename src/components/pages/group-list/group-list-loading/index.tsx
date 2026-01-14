import { CardSkeleton } from '@/components/shared/card/card-skeleton';
import { GROUP_LIST_MIN_HEIGHT, GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';

export const GroupListSkeleton = () => (
  <section className={`${GROUP_LIST_MIN_HEIGHT} bg-[#F1F5F9]`}>
    <div className='flex w-full flex-col px-4 py-4'>
      <div className='flex w-full flex-col gap-4'>
        {Array.from({ length: GROUP_LIST_PAGE_SIZE }).map((_, i) => (
          <CardSkeleton key={i} showButtons={false} />
        ))}
      </div>
    </div>
  </section>
);
