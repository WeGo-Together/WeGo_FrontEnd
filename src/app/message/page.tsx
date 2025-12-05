import { FollowingList, FollowingSearch } from '@/components/pages/message';
import { TabNavigation } from '@/components/shared';

const SOCIAL_TABS = [
  { label: '팔로잉', path: '/message' },
  { label: '메세지', path: '/message/chat' },
];

const FOLLOWING_LIST = [
  {
    name: '신짱구',
    profileImage: '',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    name: '신짱구',
    profileImage: '',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    name: '신짱구',
    profileImage: '',
    profileMessage: '안녕하세요 신짱구입니다',
  },
];

export default function FollowingPage() {
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation tabs={SOCIAL_TABS} />
      <FollowingSearch />
      <FollowingList items={FOLLOWING_LIST} />
    </div>
  );
}
