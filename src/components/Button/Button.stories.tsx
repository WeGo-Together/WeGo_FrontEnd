import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'danger'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Primary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'lg',
    children: 'Outline Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'lg',
    children: 'Danger Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col items-center gap-2'>
      <Button size='sm' variant='primary'>
        Primary Small
      </Button>
      <Button size='md' variant='primary'>
        Primary Medium
      </Button>
      <Button size='lg' variant='primary'>
        Primary Large
      </Button>

      <Button size='sm' variant='outline'>
        Outline Small
      </Button>
      <Button size='md' variant='outline'>
        Outline Medium
      </Button>
      <Button size='lg' variant='outline'>
        Outline Large
      </Button>

      <Button size='sm' variant='danger'>
        Danger Small
      </Button>
      <Button size='md' variant='danger'>
        Danger Medium
      </Button>
      <Button size='lg' variant='danger'>
        Danger Large
      </Button>
      <Button disabled size='lg' variant='primary'>
        Disabled Primary
      </Button>
      <Button disabled size='lg' variant='outline'>
        Disabled Outline
      </Button>
      <Button disabled size='lg' variant='danger'>
        Disabled Danger
      </Button>
    </div>
  ),
};
