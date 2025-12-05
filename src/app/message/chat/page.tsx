import { TabNavigation } from '@/components/shared';

const SOCIAL_TABS = [
  { label: '팔로잉', path: '/message' },
  { label: '메세지', path: '/message/chat' },
];

export default function ChatPage() {
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation tabs={SOCIAL_TABS} />
      <section className='flex w-full flex-col gap-4 px-4 py-4'>
        <h2 className='text-h2-bold'>채팅 페이지</h2>
      </section>
    </div>
  );
}
