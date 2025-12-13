import { API } from '@/api';
import GroupList from '@/components/pages/group-list';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const response = await API.groupService.getGroups({ size: GROUP_LIST_PAGE_SIZE });
  // 초기 모임 목록 데이터 추출
  const initialItems = response.items;
  // 다음 페이지 요청을 위한 커서 값 추출
  const initialCursor = response.nextCursor;

  // 초기 데이터를 전달해서 무한 스크롤 시작할거임
  return <GroupList initialCursor={initialCursor} initialItems={initialItems} />;
}
