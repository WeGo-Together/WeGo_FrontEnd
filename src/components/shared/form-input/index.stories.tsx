import type { Meta, StoryObj } from '@storybook/nextjs';

import { FormInput } from './index';

const meta: Meta<typeof FormInput> = {
  title: 'shared/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    labelName: { control: 'text' },
    placeholder: { control: 'text' },
    inputType: { control: 'text' },
    hintMessage: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof FormInput>;

// 기본 스토리
export const Default: Story = {
  args: {
    required: true,
    labelName: '아이디',
    placeholder: '아이디를 입력해주세요.',
    inputType: 'email',
  },
};

// 닉네임 스토리
export const Nickname: Story = {
  args: {
    required: true,
    labelName: '닉네임',
    placeholder: '닉네임을 입력해주세요.',
    inputType: 'text',
  },
};

// 비밀번호 스토리
export const Password: Story = {
  args: {
    required: true,
    labelName: '비밀번호',
    placeholder: '비밀번호를 입력해주세요.',
    inputType: 'password',
  },
};
