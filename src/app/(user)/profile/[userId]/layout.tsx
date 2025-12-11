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

  // 본인 id와 같은지 확인 후 같으면 mypage로 리다이렉트
  // if (userId === 1) {
  //   redirect('/mypage');
  // }

  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: userKeys.item(userId),
    queryFn: () => API.userService.getUser({ userId }),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default ProfileLayout;
