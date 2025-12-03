// SearchBar.stories.tsx

import type { Meta, StoryObj } from '@storybook/nextjs';

import { SearchBar } from './index';

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSearch: { action: 'searched' },
    onChange: { action: 'changed' },
  },
  args: {
    placeholder: '검색어를 입력하세요',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 검색바
export const Default: Story = {};

// 넓은 너비를 가진 검색바 예시
export const FullWidth: Story = {
  args: {
    className: 'w-[440px]',
  },
};

// 긴 placeholder 예시
export const WithLongPlaceholder: Story = {
  args: {
    placeholder: '검색어를 입력한 뒤 엔터를 누르거나 아이콘을 클릭하세요',
  },
};
