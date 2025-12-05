'use client';

import { useRouter } from 'next/navigation';

import Card from '@/components/shared/card';

const MOCK_MEETINGS = [
  {
    id: 3,
    title: '동네 책모임 신규 멤버 구함',
    images: [],
    location: '망원동 카페 거리',
    dateTime: '25. 12. 10 - 19:30',
    nickName: 'Book Lover',
    participantCount: 3,
    maxParticipants: 8,
    tags: ['#책모임', '#수다환영'],
  },
];

export default function History() {
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
