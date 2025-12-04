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
  {
    id: 4,
    title: '퇴근 후 보드게임 번개',
    images: [],
    location: '홍대입구역 인근',
    dateTime: '25. 12. 02 - 20:00',
    nickName: 'Board Master',
    participantCount: 6,
    maxParticipants: 10,
    tags: ['#보드게임', '#처음이어도환영'],
  },
  {
    id: 5,
    title: '주말 등산 같이 가요',
    images: [],
    location: '북한산 입구',
    dateTime: '25. 12. 07 - 09:00',
    nickName: 'Hiker Lee',
    participantCount: 4,
    maxParticipants: 15,
    tags: ['#등산', '#초보환영'],
  },
];

export default function MeetingsPage() {
  return (
    <main className='min-h-screen bg-[#F1F5F9]'>
      <section className='mx-auto flex w-full max-w-[432px] flex-col gap-4 px-4 py-4'>
        {MOCK_MEETINGS.map((meeting) => (
          <Card
            key={meeting.id}
            dateTime={meeting.dateTime}
            images={meeting.images}
            location={meeting.location}
            maxParticipants={meeting.maxParticipants}
            nickName={meeting.nickName}
            participantCount={meeting.participantCount}
            tags={meeting.tags}
            title={meeting.title}
          />
        ))}
      </section>
    </main>
  );
}
