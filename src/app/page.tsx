import type { Metadata } from 'next';

import { InfiniteData } from '@tanstack/react-query';

import { API } from '@/api';
import GroupList from '@/components/pages/group-list';
import { GroupSearchBar } from '@/components/pages/group-list/group-search-bar';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';
import { generateHomeMetadata } from '@/lib/metadata/home';
import { GetGroupsResponse } from '@/types/service/group';

export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export const generateMetadata = async ({ searchParams }: HomePageProps): Promise<Metadata> => {
  const params = await searchParams;
  return await generateHomeMetadata(params.keyword);
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const keyword = params.keyword;

  const response = await API.groupService.getGroups({
    size: GROUP_LIST_PAGE_SIZE,
    keyword,
  });

  // React Query의 useInfiniteQuery에 맞는 initialData 형태로 변환
  const initialData: InfiniteData<GetGroupsResponse, number | undefined> = {
    pages: [response],
    pageParams: [undefined], // 첫 페이지는 cursor가 없으므로 undefined
  };

  // 초기 데이터를 전달해서 무한 스크롤 시작
  return (
    <>
      <GroupSearchBar />
      <GroupList initialData={initialData} initialKeyword={keyword} />
    </>
  );
}
