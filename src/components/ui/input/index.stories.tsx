import type { Meta, StoryObj } from '@storybook/nextjs';

import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'search'],
    },
    disabled: { control: 'boolean' },
    onIconClick: { action: 'icon clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: '아이디 입력',
  },
};

// password 상태 예시
export const Password: Story = {
  args: {
    placeholder: '비밀번호 입력',
    type: 'password',
    className: 'border rounded-2xl',
  },
};

// 검색용 스토리
export const Search: Story = {
  args: {
    placeholder: '검색해보세요',
    type: 'search',
    className: 'rounded-full border',
  },
};
