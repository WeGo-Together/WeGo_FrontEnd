import type { Metadata } from 'next';

import { Suspense } from 'react';

import GroupList from '@/components/pages/group-list';
import { GroupSearchBar } from '@/components/pages/group-list/group-search-bar';
import { CardSkeleton } from '@/components/shared/card/card-skeleton';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';
import { generateHomeMetadata } from '@/lib/metadata/home';

interface HomePageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export const generateMetadata = async ({ searchParams }: HomePageProps): Promise<Metadata> => {
  const params = await searchParams;
  return await generateHomeMetadata(params.keyword);
};

export default async function HomePage(_props: HomePageProps) {
  return (
    <div>
      <GroupSearchBar />
      <Suspense fallback={<GroupListSkeleton />}>
        <GroupList />
      </Suspense>
    </div>
  );
}

const GroupListSkeleton = () => (
  <section className={`min-h-[calc(100vh-168px)] bg-[#F1F5F9]`}>
    <div className='flex w-full flex-col px-4 py-4'>
      <div className='flex w-full flex-col gap-4'>
        {Array.from({ length: GROUP_LIST_PAGE_SIZE }).map((_, i) => (
          <CardSkeleton key={i} showButtons={false} />
        ))}
      </div>
    </div>
  </section>
);
