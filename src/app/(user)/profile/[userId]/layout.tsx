import { notFound, redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { API } from '@/api';
import { getQueryClient } from '@/lib/query-client';
import { userKeys } from '@/lib/query-key/query-key-user';

interface Props {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}

const ProfileLayout = async ({ children, params }: Props) => {
  const { userId: id } = await params;
  const userId = Number(id);

  // userId가 숫자가 아닌 경우 notFound redirect 처리
  if (isNaN(userId)) notFound();

  const queryClient = getQueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: userKeys.item(userId),
    queryFn: () => API.userService.getUser({ userId }),
  });

  // isFollow가 null이면 본인 페이지 이므로 mypage로 redirect 처리
  if (user.isFollow === null) redirect('/mypage');

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default ProfileLayout;
