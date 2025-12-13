import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';

interface Props {
  children: React.ReactNode;
  params: Promise<{ groupId: string }>;
}

const MeetupDetailLayout = async ({ children, params }: Props) => {
  const { groupId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: groupKeys.detail(groupId),
    queryFn: async () => API.groupService.getGroupDetails({ groupId }),
  });

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default MeetupDetailLayout;
