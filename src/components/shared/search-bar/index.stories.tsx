import type { Meta, StoryObj } from '@storybook/nextjs';

import { SearchBar } from './index';

const meta: Meta<typeof SearchBar> = {
  title: 'shared/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    placeholder: { control: 'text' },
    onIconClick: { action: 'search icon clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: '원하는 모임을 검색해보세요.',
  },
};

// 커스텀 스타일 스토리 예시
export const WithCustomWrapper: Story = {
  args: {
    placeholder: '원하는 모임을 검색해보세요.',
    className: 'max-w-md mx-auto',
  },
};
