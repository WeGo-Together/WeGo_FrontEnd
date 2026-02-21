import { cookies } from 'next/headers';

import { API } from '@/api';

import ChatRoomPage from './ChatRoomPage';

export default async function Page({ params }: { params: Promise<{ roomId: string }> }) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const me = await API.userService.getMe();
  const userId = me?.userId;

  return (
    <ChatRoomPage
      accessToken={accessToken!}
      roomId={Number(resolvedParams.roomId)}
      userId={userId}
    />
  );
}
