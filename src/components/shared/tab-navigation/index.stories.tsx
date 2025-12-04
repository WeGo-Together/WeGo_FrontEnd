import type { Meta, StoryObj } from '@storybook/nextjs';

import { TabNavigation } from './index';

const meta = {
  title: 'Shared/TabNavigation',
  component: TabNavigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: '표시할 탭 목록 (2개 or 3개)',
      control: 'object',
    },
  },
} satisfies Meta<typeof TabNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 2개 탭 - 첫 번째 탭 활성화
 */
export const TwoTabsFirst: Story = {
  args: {
    tabs: [
      { label: '팔로잉', path: '/following' },
      { label: '메세지', path: '/message' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/following',
      },
    },
  },
};

/**
 * 2개 탭 - 두 번째 탭 활성화
 */
export const TwoTabsSecond: Story = {
  args: {
    tabs: [
      { label: '팔로잉', path: '/following' },
      { label: '메세지', path: '/message' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/message',
      },
    },
  },
};

/**
 * 3개 탭 - 첫 번째 탭 활성화
 */
export const ThreeTabsFirst: Story = {
  args: {
    tabs: [
      { label: '현재 모임', path: '/schedule/current' },
      { label: '나의 모임', path: '/schedule/my' },
      { label: '모임 이력', path: '/schedule/history' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/schedule/current',
      },
    },
  },
};

/**
 * 3개 탭 - 두 번째 탭 활성화
 */
export const ThreeTabsSecond: Story = {
  args: {
    tabs: [
      { label: '현재 모임', path: '/schedule/current' },
      { label: '나의 모임', path: '/schedule/my' },
      { label: '모임 이력', path: '/schedule/history' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/schedule/my',
      },
    },
  },
};

/**
 * 3개 탭 - 세 번째 탭 활성화
 */
export const ThreeTabsThird: Story = {
  args: {
    tabs: [
      { label: '현재 모임', path: '/schedule/current' },
      { label: '나의 모임', path: '/schedule/my' },
      { label: '모임 이력', path: '/schedule/history' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/schedule/history',
      },
    },
  },
};
