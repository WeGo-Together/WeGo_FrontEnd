import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './index';

const StoryContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='mx-auto flex w-[375px] items-center justify-center'>{children}</div>;
};

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'sm'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '로그인하기',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: '취소',
    variant: 'secondary',
    size: 'md',
  },
};

export const Tertiary: Story = {
  args: {
    children: '삭제',
    variant: 'tertiary',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: '작은 버튼',
    variant: 'primary',
    size: 'sm',
  },
};
