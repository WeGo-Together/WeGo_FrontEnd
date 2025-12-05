import type { Meta, StoryObj } from '@storybook/nextjs';

import Card from '.';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '강남에서 하는 자바 스터디',
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/images/sample-thumbnail.jpg',
    ],
    tags: ['#자바', '#백엔드', '#스터디'],
    location: '서울 강남구 · 강남역 2번 출구 근처 카페',
    dateTime: '25. 12. 10 - 19:00',
    nickName: '네즈코',
    participantCount: 8,
    maxParticipants: 10,
    profileImage: null,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    ...Default.args,
    images: [],
  },
};

export const WithoutProfileImage: Story = {
  args: {
    ...Default.args,
  },
};

export const ManyTags: Story = {
  args: {
    ...Default.args,
    tags: ['#러닝', '#아침운동', '#주말', '#건강', '#친목', '#초보환영'],
  },
};
