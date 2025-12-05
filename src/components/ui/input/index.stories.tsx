import type { Meta, StoryObj } from '@storybook/nextjs';

import { Icon } from '@/components/icon';

import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'search'],
    },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// 기본 텍스트 인풋
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    type: 'text',
  },
};

// 비밀번호 인풋
export const Password: Story = {
  args: {
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
  },
};

// 검색 아이콘이 포함된 인풋
export const WithIconButton: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    type: 'search',
    iconButton: (
      <button className='absolute top-4 right-5 h-6 w-6' aria-label='검색 실행' type='button'>
        <Icon id='search' className='text-mint-600' />
      </button>
    ),
  },
};

// 비활성화된 인풋
export const Disabled: Story = {
  args: {
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};
