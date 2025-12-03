// Input.stories.tsx

import type { Meta, StoryObj } from '@storybook/nextjs';

import { Icon } from '@/components/shared/icon';

import { Input } from './index';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
  args: {
    placeholder: '값을 입력하세요',
    type: 'text',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 인풋
export const Default: Story = {
  render: (args) => (
    <div className='w-[440px]'>
      <Input {...args} />
    </div>
  ),
};

// 비밀번호 인풋
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
  render: (args) => (
    <div className='w-[440px]'>
      <Input {...args} />
    </div>
  ),
};

// 오른쪽에 검색 아이콘 버튼이 있는 인풋
export const WithSearchIcon: Story = {
  args: {
    type: 'search',
    placeholder: '검색어를 입력하세요',
  },
  render: (args) => (
    <div className='w-[440px]'>
      <Input
        {...args}
        iconButton={
          <button className='absolute top-4 right-5 h-6 w-6' aria-label='검색 실행' type='button'>
            <Icon id='search' className='text-mint-600' />
          </button>
        }
      />
    </div>
  ),
};

// 비활성화된 인풋
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성 상태',
  },
  render: (args) => (
    <div className='w-[440px]'>
      <Input {...args} />
    </div>
  ),
};
