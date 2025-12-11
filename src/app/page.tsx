'use client';

import Card from '@/components/shared/card';
import { useGetGroups } from '@/hooks/use-group/use-group-get-list';
import { formatDateTime } from '@/lib/formatDateTime';

export default function HomePage() {
  const { data, isLoading, error } = useGetGroups({ size: 10 });

  if (isLoading) {
    return (
      <main className='min-h-screen bg-[#F1F5F9]'>
        <section className='flex w-full flex-col gap-4 px-4 py-4'>
          <div className='py-8 text-center text-gray-500'>로딩 중...</div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className='min-h-screen bg-[#F1F5F9]'>
        <section className='flex w-full flex-col gap-4 px-4 py-4'>
          <div className='py-8 text-center text-red-500'>
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        </section>
      </main>
    );
  }

  const meetings = data?.items || [];

  return (
    <main className='min-h-screen bg-[#F1F5F9]'>
      <section className='flex w-full flex-col gap-4 px-4 py-4'>
        {meetings.length === 0 ? (
          <div className='py-8 text-center text-gray-500'>모임이 없습니다.</div>
        ) : (
          meetings.map((meeting) => (
            <Card
              key={meeting.id}
              dateTime={formatDateTime(meeting.startTime, meeting.endTime)}
              images={meeting.images}
              location={meeting.location}
              maxParticipants={meeting.maxParticipants}
              nickName={meeting.createdBy.nickName}
              participantCount={meeting.participantCount}
              profileImage={meeting.createdBy.profileImage}
              tags={meeting.tags}
              title={meeting.title}
            />
          ))
        )}
      </section>
    </main>
  );
}
