'use client';

import { useRouter } from 'next/navigation';

import Card from '@/components/shared/card';

const MOCK_MEETINGS = [
  {
    id: 2,
    title: '주말 러닝 크루 모집',
    images: [],
    location: '한강공원 잠실지구',
    dateTime: '25. 12. 05 - 07:30',
    nickName: 'Minseo Kim',
    participantCount: 5,
    maxParticipants: 12,
    tags: ['#러닝', '#아침운동'],
  },
];

export default function My() {
  const router = useRouter();

  return (
    <section className='flex w-full flex-col gap-4 px-4 py-4'>
      {MOCK_MEETINGS.map((meeting) => (
        <Card
          key={meeting.id}
          dateTime={meeting.dateTime}
          images={meeting.images}
          leaveAndChatActions={{
            onLeave: () => console.log('모임 탈퇴', meeting.id),
            onChat: () => router.push(`/chat/${meeting.id}`),
          }}
          location={meeting.location}
          maxParticipants={meeting.maxParticipants}
          nickName={meeting.nickName}
          participantCount={meeting.participantCount}
          tags={meeting.tags}
          title={meeting.title}
          onClick={() => router.push(`/meetup/${meeting.id}`)}
        />
      ))}
    </section>
  );
}
