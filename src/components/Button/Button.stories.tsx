import type { Meta, StoryObj } from '@storybook/nextjs';
import { expect, within } from '@storybook/test';

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

// ❌ 이 스토리는 의도적으로 실패합니다
export const FailingTest: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Test Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // 의도적으로 실패하는 테스트
    await expect(button).toHaveTextContent('Wrong Text'); // 실제로는 "Test Button"
  },
};

// ❌ 존재하지 않는 요소를 찾으려고 시도 (실패)
export const MissingElement: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 존재하지 않는 요소를 찾으려 함 - 실패!
    const nonExistent = canvas.getByTestId('does-not-exist');
    await expect(nonExistent).toBeInTheDocument();
  },
};

// ❌ 잘못된 스타일 검증 (실패)
export const WrongStyle: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Styled Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // primary는 bg-primary-600이지만 bg-red-500을 기대 - 실패!
    await expect(button).toHaveClass('bg-red-500');
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
