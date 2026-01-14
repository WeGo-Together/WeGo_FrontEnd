import { CardSkeleton } from '@/components/shared/card/card-skeleton';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';

interface Props {
  tab: 'current' | 'myPost' | 'past';
}

export const ScheduleSkeleton = ({ tab }: Props) => {
  const BUTTON_OPTIONS = {
    current: true,
    myPost: true,
    past: false,
  };

  return (
    <section className='p-4'>
      <div className='flex w-full flex-col gap-4'>
        {Array.from({ length: GROUP_LIST_PAGE_SIZE }).map((_, i) => (
          <CardSkeleton key={i} showButtons={BUTTON_OPTIONS[tab]} />
        ))}
      </div>
    </section>
  );
};
