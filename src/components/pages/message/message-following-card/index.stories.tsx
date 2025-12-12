import type { Meta, StoryObj } from '@storybook/nextjs';

import { FollowingCard } from '.';

const meta = {
  title: 'Components/Following Card',
  component: FollowingCard,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FollowingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  userId: 0,
  nickname: '신짱구',
  profileImage:
    'https://images.unsplash.com/photo-1714635218254-740bad86a0e8?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export const FollowingCardTable: Story = {
  args: {
    userId: 0,
    nickname: '',
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
              {...baseArgs}
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
              {...baseArgs}
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
              {...baseArgs}
              count={0}
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
              {...baseArgs}
              count={1}
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
              {...baseArgs}
              count={10}
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
              {...baseArgs}
              count={100}
              profileMessage='알림 100개 테스트'
              type='message'
            />
          </td>
        </tr>
      </tbody>
    </table>
  ),
};
