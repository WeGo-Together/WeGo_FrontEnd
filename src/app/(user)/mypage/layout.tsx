import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { API } from '@/api';
import { getQueryClient } from '@/lib/query-client';
import { userKeys } from '@/lib/query-key/query-key-user';

interface Props {
  children: React.ReactNode;
}

const MyPageLayout = async ({ children }: Props) => {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: userKeys.me(),
      queryFn: () => API.userService.getMe(),
    });
  } catch {
    redirect('/login');
  }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default MyPageLayout;
