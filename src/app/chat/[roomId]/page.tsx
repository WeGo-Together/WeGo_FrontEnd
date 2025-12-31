import { cookies } from 'next/headers';

import ChatRoomPage from './ChatRoomPage';

export default async function Page({ params }: { params: Promise<{ roomId: string }> }) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const userId = Number(cookieStore.get('userId')?.value || 0);

  return (
    <ChatRoomPage
      accessToken={accessToken!}
      roomId={Number(resolvedParams.roomId)}
      userId={userId}
    />
  );
}
