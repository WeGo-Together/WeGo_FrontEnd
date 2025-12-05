import type { Meta, StoryObj } from '@storybook/nextjs';

import { FormInput } from './index';

const meta = {
  title: 'Components/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    labelName: '라벨',
    required: true,
    inputProps: {
      type: 'text',
      placeholder: '값을 입력하세요',
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 텍스트 인풋
export const Default: Story = {
  args: {
    hintMessage: '',
    required: true,
    inputProps: {
      type: 'text',
      placeholder: '값을 입력하세요',
    },
  },
};

// 힌트가 있는 인풋
export const WithHint: Story = {
  args: {
    labelName: '이메일',
    required: false,
    inputProps: {
      type: 'text',
      placeholder: 'name@example.com',
    },
  },
};

// 비밀번호 인풋 (눈 아이콘 토글 동작 확인용)
export const Password: Story = {
  args: {
    labelName: '비밀번호',
    required: true,
    inputProps: {
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
    },
  },
};

// 에러 상태 예시 (스타일은 프로젝트 스타일에 맞춰 조정)
export const ErrorState: Story = {
  args: {
    labelName: '닉네임',
    hintMessage: '이미 사용 중인 닉네임입니다.',
    required: true,
    inputProps: {
      type: 'text',
      placeholder: '닉네임을 입력하세요',
    },
  },
};
