import { InfiniteData } from '@tanstack/react-query';

import { API } from '@/api';
import GroupList from '@/components/pages/group-list';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';
import { GetGroupsResponse } from '@/types/service/group';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const response = await API.groupService.getGroups({ size: GROUP_LIST_PAGE_SIZE });

  // React Query의 useInfiniteQuery에 맞는 initialData 형태로 변환
  const initialData: InfiniteData<GetGroupsResponse, number | undefined> = {
    pages: [response],
    pageParams: [undefined], // 첫 페이지는 cursor가 없으므로 undefined
  };

  // 초기 데이터를 전달해서 무한 스크롤 시작
  return <GroupList initialData={initialData} />;
}
