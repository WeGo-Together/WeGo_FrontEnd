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
    placeholder: '값을 입력하세요',
  },
} satisfies Meta<typeof FormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 텍스트 인풋
export const Default: Story = {
  args: {
    type: 'text',
    hintMessage: '',
    required: false,
  },
};

// 힌트가 있는 인풋
export const WithHint: Story = {
  args: {
    type: 'text',
    labelName: '이메일',
    placeholder: 'name@example.com',
    hintMessage: '가입에 사용할 이메일을 입력하세요.',
    required: true,
  },
};

// 비밀번호 인풋 (눈 아이콘 토글 동작 확인용)
export const Password: Story = {
  args: {
    type: 'password',
    labelName: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    hintMessage: '영문, 숫자, 특수문자를 포함해 주세요.',
    required: true,
  },
};

// 에러 상태 예시 (스타일은 프로젝트 스타일에 맞춰 조정)
export const ErrorState: Story = {
  args: {
    type: 'text',
    labelName: '닉네임',
    placeholder: '닉네임을 입력하세요',
    hintMessage: '이미 사용 중인 닉네임입니다.',
    required: true,
    className: ' [&>input]:border-red-500', // 필요에 따라 Input에 에러 스타일 적용
  },
};
