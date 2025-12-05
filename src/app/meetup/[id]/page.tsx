import {
  MeetupBannerImages,
  MeetupButtons,
  MeetupDescriptions,
  MeetupMembers,
} from '@/components/pages/meetup';

const MeetupDetailPage = () => {
  return (
    <div>
      <MeetupBannerImages images={DUMMY_MEETUP_DATA.bannerImages} />
      <MeetupDescriptions description={DUMMY_MEETUP_DATA.description} />
      <MeetupMembers members={DUMMY_MEETUP_DATA.members} />
      <MeetupButtons
        members={DUMMY_MEETUP_DATA.members}
        ownerInfo={DUMMY_MEETUP_DATA.description.ownerInfo}
        progress={DUMMY_MEETUP_DATA.description.progress}
      />
    </div>
  );
};

export default MeetupDetailPage;

// 바인딩 테스트용 더미 데이터임 (무시하세요)
export const DUMMY_MEETUP_DATA = {
  bannerImages: [
    'https://images.unsplash.com/photo-1546512347-3ad629c193c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1700554043895-6e87a46a2b21?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  description: {
    ownerInfo: {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Dummy Name',
      bio: 'Some Dummy Bio Message',
    },
    title: '동탄 호수공원에서 피크닉하실 분 구해요!',
    tags: ['동탄2', '피크닉', '노가리'],
    content:
      '동탄 호수공원에서 가볍게 피그닉 하실 분을 기다리고 있어요! 간단히 먹거리 나누고, 잔디밭에서 편하게 이야기하며 쉬는 느낌의 소규모 모임입니다.\n혼자 오셔도 편하게 어울릴 수 있어요!',
    setting: {
      location: '화성시 산척동',
      date: '25.11.28',
      time: '10:00',
    },
    progress: {
      current: 9,
      max: 12,
    },
    createdAt: '30분 전',
  },
  members: [
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName01',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName02',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName03',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName04',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName05',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName06',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName07',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName08',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName09',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName10',
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'UserNickName11',
    },
  ],
};
