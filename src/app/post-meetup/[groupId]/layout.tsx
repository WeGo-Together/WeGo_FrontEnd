import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';

interface Props {
  children: React.ReactNode;
  params: Promise<{ groupId: string }>;
}

const EditMeetupLayout = async ({ children, params }: Props) => {
  const queryClient = new QueryClient();

  const { groupId } = await params;

  const { userId: sessionUserId } = await API.userService.getMe();

  const { createdBy, status } = await queryClient.fetchQuery({
    queryKey: groupKeys.detail(groupId),
    queryFn: async () => API.groupService.getGroupDetails({ groupId }),
  });

  const isHost = sessionUserId === createdBy.userId;
  const isEditable = status !== 'FINISHED';

  if (!isHost && !isEditable) {
    redirect('/post-meetup');
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default EditMeetupLayout;
