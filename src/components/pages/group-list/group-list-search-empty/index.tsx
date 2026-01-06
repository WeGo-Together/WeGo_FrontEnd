import { EmptyState } from '@/components/layout/empty-state';
import {
  GROUP_LIST_SEARCH_EMPTY_HEIGHT,
  GROUP_LIST_SEARCH_EMPTY_TOP_MARGIN,
} from '@/lib/constants/group-list';

export const GroupListSearchEmpty = () => (
  <div
    className={`relative ${GROUP_LIST_SEARCH_EMPTY_TOP_MARGIN} flex ${GROUP_LIST_SEARCH_EMPTY_HEIGHT} flex-col items-center justify-center`}
  >
    <EmptyState>검색 결과가 없어요.</EmptyState>
  </div>
);
