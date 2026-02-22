import { notFound, redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { API } from '@/api';
import { generateProfileMetadata } from '@/lib/metadata/profile';
import { getQueryClient } from '@/lib/query-client';
import { userKeys } from '@/lib/query-key/query-key-user';

interface Props {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { userId: id } = await params;
  const userId = Number(id);
  return await generateProfileMetadata(userId);
};

const ProfileLayout = async ({ children, params }: Props) => {
  const { userId: id } = await params;
  const userId = Number(id);

  // userId가 숫자가 아닌 경우 notFound redirect 처리
  if (isNaN(userId)) notFound();

  const queryClient = getQueryClient();

  const [user, me] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: userKeys.item(userId),
      queryFn: () => API.userService.getUser({ userId }),
    }),
    queryClient
      .fetchQuery({
        queryKey: userKeys.me(),
        queryFn: () => API.userService.getMe(),
      })
      .catch(() => null),
  ]);

  if (!user) notFound();

  if (me?.userId === user.userId) redirect('/mypage');

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default ProfileLayout;
