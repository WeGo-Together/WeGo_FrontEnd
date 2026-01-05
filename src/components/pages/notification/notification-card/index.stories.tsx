import type { Meta, StoryObj } from '@storybook/nextjs';

import { mockNotificationItems } from '@/mock/service/notification/notification-mocks';

import { NotificationCard } from '.';

const meta = {
  title: 'Components/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[400px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Follow: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'FOLLOW')!,
  },
};

export const GroupJoin: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_JOIN')!,
  },
};

export const GroupLeave: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_LEAVE')!,
  },
};

export const GroupCreate: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_CREATE')!,
  },
};

export const GroupDelete: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_DELETE')!,
  },
};

export const GroupJoinRequest: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_JOIN_REQUEST')!,
  },
};

export const GroupJoinApproved: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_JOIN_APPROVED')!,
  },
};

export const GroupJoinRejected: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_JOIN_REJECTED')!,
  },
};

export const GroupJoinKicked: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'GROUP_JOIN_KICKED')!,
  },
};

export const Unread: Story = {
  args: {
    item: {
      ...mockNotificationItems[0],
      readAt: '',
    },
  },
};

export const Read: Story = {
  args: {
    item: {
      ...mockNotificationItems[0],
      readAt: '2024-01-01T12:00:00Z',
    },
  },
};

export const AllNotifications: Story = {
  args: {
    item: mockNotificationItems[0], // 더미 args
  },
  render: () => (
    <div className='flex flex-col gap-0'>
      {mockNotificationItems.map((item) => (
        <NotificationCard key={item.id} item={item} />
      ))}
    </div>
  ),
  decorators: [
    (Story) => (
      <div className='w-110'>
        <Story />
      </div>
    ),
  ],
};
