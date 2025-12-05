'use client';

import { useRouter } from 'next/navigation';

import Card from '@/components/shared/card';

const MOCK_MEETINGS = [
  {
    id: 1,
    title: '네즈코와 무한성에서 정모 하실 분',
    images: [],
    location: '네즈코 호수공원',
    dateTime: '25. 11. 28 - 10:00',
    nickName: 'Hope Lee',
    participantCount: 8,
    maxParticipants: 10,
    tags: ['#태그', '#태그', '#태그'],
  },
];

export default function Current() {
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
