import type { Meta, StoryObj } from '@storybook/nextjs';

import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'UI/Input', // Storybook 사이드바에 표시될 경로
  component: Input,
  tags: ['autodocs'], // Docs 자동 생성
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'text' },
    disabled: { control: 'boolean' },
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

// Custom
export const Custom: Story = {
  args: {
    placeholder: '검색해보세요',
    type: 'search',
    className: 'rounded-full border',
  },
};
