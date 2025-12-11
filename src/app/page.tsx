import Card from '@/components/shared/card';

// GroupListItemResponse 타입
// {
//   id: number;
//   title: string;
//   location: string;
//   locationDetail?: string | null;
//   startTime: string; // ISO 8601 형식: "2026-12-25T19:00:00"
//   endTime?: string | null; // ISO 8601 형식: "2026-12-25T21:00:00"
//   images: string[]; // 이미지 URL 배열
//   tags: string[];
//   description: string;
//   participantCount: number;
//   maxParticipants: number;
//   createdBy: {
//     userId: number;
//     nickName: string;
//     profileImage: string | null;
//   };
//   createdAt: string; // ISO 8601 형식
//   updatedAt: string; // ISO 8601 형식
// }

const formatDateTime = (startTime: string, _endTime?: string | null): string => {
  const start = new Date(startTime);
  const year = start.getFullYear().toString().slice(-2);
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');
  const hours = String(start.getHours()).padStart(2, '0');
  const minutes = String(start.getMinutes()).padStart(2, '0');

  return `${year}. ${month}. ${day} - ${hours}:${minutes}`;
};

const MOCK_MEETINGS = [
  {
    id: 1,
    title: '네즈코와 무한성에서 정모 하실 분',
    location: '네즈코 호수공원',
    locationDetail: '호수공원 입구 근처',
    startTime: '2025-11-28T10:00:00',
    endTime: '2025-11-28T12:00:00',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: ['젠이츠', '기유', '네즈코'],
    description: '네즈코와 무한성에서 정모 하실 분들을 모집합니다.',
    participantCount: 8,
    maxParticipants: 10,
    createdBy: {
      userId: 1,
      nickName: 'Hope Lee',
      profileImage: null,
    },
    createdAt: '2025-11-20T14:29:06',
    updatedAt: '2025-11-20T14:29:06',
  },
  {
    id: 2,
    title: '주말 러닝 크루 모집',
    location: '한강공원 잠실지구',
    locationDetail: '잠실나루역 2번 출구',
    startTime: '2025-12-05T07:30:00',
    endTime: '2025-12-05T09:30:00',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: ['러닝', '아침운동'],
    description: '주말 아침 한강에서 함께 러닝하실 분들을 모집합니다.',
    participantCount: 5,
    maxParticipants: 12,
    createdBy: {
      userId: 2,
      nickName: 'Minseo Kim',
      profileImage: null,
    },
    createdAt: '2025-11-25T10:15:00',
    updatedAt: '2025-11-25T10:15:00',
  },
  {
    id: 3,
    title: '동네 책모임 신규 멤버 구함',
    location: '망원동 카페 거리',
    locationDetail: '망원역 1번 출구 근처',
    startTime: '2025-12-10T19:30:00',
    endTime: '2025-12-10T21:30:00',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: ['책모임', '수다환영'],
    description: '동네에서 책을 읽고 이야기 나누는 모임입니다.',
    participantCount: 3,
    maxParticipants: 8,
    createdBy: {
      userId: 3,
      nickName: 'Book Lover',
      profileImage: null,
    },
    createdAt: '2025-12-01T09:00:00',
    updatedAt: '2025-12-01T09:00:00',
  },
  {
    id: 4,
    title: '퇴근 후 보드게임 번개',
    location: '홍대입구역 인근',
    locationDetail: '홍대입구역 9번 출구',
    startTime: '2025-12-02T20:00:00',
    endTime: '2025-12-02T23:00:00',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: ['보드게임', '처음이어도환영'],
    description: '퇴근 후 보드게임으로 스트레스 풀어요!',
    participantCount: 6,
    maxParticipants: 10,
    createdBy: {
      userId: 4,
      nickName: 'Board Master',
      profileImage: null,
    },
    createdAt: '2025-11-28T18:30:00',
    updatedAt: '2025-11-28T18:30:00',
  },
  {
    id: 5,
    title: '주말 등산 같이 가요',
    location: '북한산 입구',
    locationDetail: '북한산 우이역 1번 출구',
    startTime: '2025-12-07T09:00:00',
    endTime: '2025-12-07T15:00:00',
    images: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: ['등산', '초보환영'],
    description: '주말에 북한산 등산 같이 가실 분 모집합니다.',
    participantCount: 4,
    maxParticipants: 15,
    createdBy: {
      userId: 5,
      nickName: 'Hiker Lee',
      profileImage: null,
    },
    createdAt: '2025-11-30T12:00:00',
    updatedAt: '2025-11-30T12:00:00',
  },
];

export default function HomePage() {
  return (
    <main className='min-h-screen bg-[#F1F5F9]'>
      <section className='flex w-full flex-col gap-4 px-4 py-4'>
        {MOCK_MEETINGS.map((meeting) => (
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
        ))}
      </section>
    </main>
  );
}
