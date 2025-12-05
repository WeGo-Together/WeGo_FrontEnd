import type { Meta, StoryObj } from '@storybook/nextjs';

import FollowingCard from '.';

const meta = {
  title: 'Components/Following Card',
  component: FollowingCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FollowingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FollowingCardTable: Story = {
  args: {
    name: '',
    profileImage: '',
    profileMessage: '',
    type: 'following',
  },
  render: () => (
    <table className='w-full border-collapse'>
      <thead>
        <tr className='border-b bg-gray-50'>
          <th className='p-4 text-left text-sm font-semibold text-gray-700'>type</th>
          <th className='p-4 text-left text-sm font-semibold text-gray-700'>설명</th>
          <th className='p-4 text-left text-sm font-semibold text-gray-700'>미리보기</th>
        </tr>
      </thead>
      <tbody className='bg-gray-200'>
        <tr className='border-b'>
          <td className='p-4 align-top text-sm font-medium text-gray-900'>Following</td>
          <td className='p-4 align-top text-sm text-gray-600'>기본 팔로잉 카드</td>
          <td className='p-4'>
            <FollowingCard
              name='얼룩말'
              profileImage='https://cdn.pixabay.com/photo/2025/11/28/15/29/zebras-9983175_1280.jpg'
              profileMessage='안녕하세요! 반갑습니다 😊'
              type='following'
            />
          </td>
        </tr>
        <tr className='border-b'>
          <td className='p-4 align-top text-sm font-medium text-gray-900'>Following</td>
          <td className='p-4 align-top text-sm text-gray-600'>
            긴 profileMessage (화면을 줄여서 확인해 주세요)
          </td>
          <td className='p-4'>
            <FollowingCard
              name='얼룩말'
              profileImage='https://cdn.pixabay.com/photo/2025/11/28/15/29/zebras-9983175_1280.jpg'
              profileMessage='안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요'
              type='following'
            />
          </td>
        </tr>
        <tr className='border-b'>
          <td className='p-4 align-top text-sm font-medium text-gray-900'>Message</td>
          <td className='p-4 align-top text-sm text-gray-600'>읽지 않은 메시지 없음</td>
          <td className='p-4'>
            <FollowingCard
              count={0}
              name='얼룩말'
              profileImage='https://cdn.pixabay.com/photo/2025/11/28/15/29/zebras-9983175_1280.jpg'
              profileMessage='알림 0개 테스트'
              type='message'
            />
          </td>
        </tr>
        <tr className='border-b'>
          <td className='p-4 align-top text-sm font-medium text-gray-900'>Message</td>
          <td className='p-4 align-top text-sm text-gray-600'>읽지 않은 메시지 1개</td>
          <td className='p-4'>
            <FollowingCard
              count={1}
              name='얼룩말'
              profileImage='https://cdn.pixabay.com/photo/2025/11/28/15/29/zebras-9983175_1280.jpg'
              profileMessage='알림 1개 테스트'
              type='message'
            />
          </td>
        </tr>
        <tr className='border-b'>
          <td className='p-4 align-top text-sm font-medium text-gray-900'>Message</td>
          <td className='p-4 align-top text-sm text-gray-600'>읽지 않은 메시지 10개</td>
          <td className='p-4'>
            <FollowingCard
              count={10}
              name='얼룩말'
              profileImage='https://cdn.pixabay.com/photo/2025/11/28/15/29/zebras-9983175_1280.jpg'
              profileMessage='알림 10개 테스트'
              type='message'
            />
          </td>
        </tr>
        <tr className='border-b'>
          <td className='p-4 align-top text-sm font-medium text-gray-900'>Message</td>
          <td className='p-4 align-top text-sm text-gray-600'>읽지 않은 메시지 99개 이상</td>
          <td className='p-4'>
            <FollowingCard
              count={100}
              name='얼룩말'
              profileImage='https://cdn.pixabay.com/photo/2025/11/28/15/29/zebras-9983175_1280.jpg'
              profileMessage='알림 100개 테스트'
              type='message'
            />
          </td>
        </tr>
      </tbody>
    </table>
  ),
};
