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
      description: '표시할 탭 목록 (2-3개)',
      control: 'object',
    },
    basePath: {
      description: '기본 경로',
      control: 'text',
    },
    paramName: {
      description: '쿼리 파라미터 이름 (기본: tab)',
      control: 'text',
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
    basePath: '/following',
    tabs: [
      { label: '팔로잉', value: 'list' },
      { label: '메세지', value: 'message' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { tab: 'list' },
      },
    },
  },
};

/**
 * 2개 탭 - 두 번째 탭 활성화
 */
export const TwoTabsSecond: Story = {
  args: {
    basePath: '/following',
    tabs: [
      { label: '팔로잉', value: 'list' },
      { label: '메세지', value: 'message' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { tab: 'message' },
      },
    },
  },
};

/**
 * 3개 탭 - 첫 번째 탭 활성화
 */
export const ThreeTabsFirst: Story = {
  args: {
    basePath: '/schedule',
    tabs: [
      { label: '현재 모임', value: 'current' },
      { label: '나의 모임', value: 'my' },
      { label: '모임 이력', value: 'history' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { tab: 'current' },
      },
    },
  },
};

/**
 * 3개 탭 - 두 번째 탭 활성화
 */
export const ThreeTabsSecond: Story = {
  args: {
    basePath: '/schedule',
    tabs: [
      { label: '현재 모임', value: 'current' },
      { label: '나의 모임', value: 'my' },
      { label: '모임 이력', value: 'history' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { tab: 'my' },
      },
    },
  },
};

/**
 * 3개 탭 - 세 번째 탭 활성화
 */
export const ThreeTabsThird: Story = {
  args: {
    basePath: '/schedule',
    tabs: [
      { label: '현재 모임', value: 'current' },
      { label: '나의 모임', value: 'my' },
      { label: '모임 이력', value: 'history' },
    ],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { tab: 'history' },
      },
    },
  },
};
