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
    item: mockNotificationItems.find((item) => item.type === 'follow')!,
  },
};

export const GroupJoin: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-join')!,
  },
};

export const GroupLeave: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-leave')!,
  },
};

export const GroupCreate: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-create')!,
  },
};

export const GroupDelete: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-delete')!,
  },
};

export const GroupJoinRequest: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-join-request')!,
  },
};

export const GroupJoinApproved: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-join-approved')!,
  },
};

export const GroupJoinRejected: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-join-rejected')!,
  },
};

export const GroupJoinKicked: Story = {
  args: {
    item: mockNotificationItems.find((item) => item.type === 'group-join-kicked')!,
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
