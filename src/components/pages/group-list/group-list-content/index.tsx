import { useRouter } from 'next/navigation';

import Card from '@/components/shared/card';
import { formatDateTime } from '@/lib/formatDateTime';
import { GroupListItemResponse } from '@/types/service/group';

interface GroupListContentProps {
  items: GroupListItemResponse[];
  keyword?: string;
}

export const GroupListContent = ({ items, keyword }: GroupListContentProps) => {
  const router = useRouter();
  const hasKeyword = Boolean(keyword);

  return (
    <div
      className={`flex w-full flex-col gap-4 ${hasKeyword ? 'mt-3' : 'py-4'}`}
      aria-label={hasKeyword ? `${keyword} 검색 결과` : '모임 목록'}
      role='list'
    >
      {items.map((meeting) => (
        <Card
          key={meeting.id}
          dateTime={formatDateTime(meeting.startTime)}
          images={meeting.images}
          isFinished={meeting.status === 'FINISHED'}
          isPending={meeting.myMembership?.status === 'PENDING'}
          location={meeting.location}
          maxParticipants={meeting.maxParticipants}
          nickName={meeting.createdBy.nickName}
          participantCount={meeting.participantCount}
          profileImage={meeting.createdBy.profileImage}
          tags={meeting.tags}
          title={meeting.title}
          onClick={() => router.push(`/group/${meeting.id}`)}
        />
      ))}
    </div>
  );
};
