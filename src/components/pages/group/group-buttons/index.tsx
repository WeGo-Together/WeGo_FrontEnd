'use client';

import { FinishedButton } from '@/components/pages/group/group-buttons/finished-button';
import { JoiningButton } from '@/components/pages/group/group-buttons/joining-button';
import { MembersButton } from '@/components/pages/group/group-buttons/members-button';
import { PendingButton } from '@/components/pages/group/group-buttons/pending-button';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  statuses: Pick<GetGroupDetailsResponse, 'status' | 'myMembership' | 'joinPolicy'>;
  chatRoomId: GetGroupDetailsResponse['chatRoomId'];
}

export const GroupButtons = ({
  statuses: { status, myMembership, joinPolicy },
  chatRoomId,
}: Props) => {
  const isMember = myMembership?.status === 'ATTEND' && status !== 'FINISHED';

  const isPending = myMembership?.status === 'PENDING' && status !== 'FINISHED';

  const isFinished = status === 'FINISHED';

  const canJoin = !isMember && !isPending && !isFinished;

  return (
    <div className='sticky bottom-[56px] border-t-1 border-gray-200 bg-white px-4 py-3'>
      {canJoin && (
        <JoiningButton
          conditions={{ isGroupFull: status === 'FULL', isFreeGroup: joinPolicy === 'FREE' }}
        />
      )}
      {isPending && <PendingButton />}
      {isMember && (
        <MembersButton
          chatRoomId={chatRoomId}
          conditions={{ isHost: myMembership.role === 'HOST' }}
        />
      )}
      {isFinished && <FinishedButton />}
    </div>
  );
};
