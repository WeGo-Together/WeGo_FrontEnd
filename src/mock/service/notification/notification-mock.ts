import { Notification } from '@/types/service/notification';

import { groupMockItem } from '../group/group-mock';
import { mockUserItems } from '../user/user-mock';

export const notificationMockItems: Notification[] = [
  {
    type: 'follow',
    user: mockUserItems[1],
    group: groupMockItem[0],
    createdAt: '2025-12-08T17:00:00+09:00',
  },
  {
    type: 'group-create',
    user: mockUserItems[1],
    group: groupMockItem[0],
    createdAt: '2025-12-08T17:00:00+09:00',
  },
  {
    type: 'group-delete',
    user: mockUserItems[1],
    group: groupMockItem[0],
    createdAt: '2025-12-08T21:00:00+09:00',
  },
  {
    type: 'group-join',
    user: mockUserItems[2],
    group: groupMockItem[0],
    createdAt: '2025-12-08T21:00:00+09:00',
  },
  {
    type: 'group-leave',
    user: mockUserItems[2],
    group: groupMockItem[0],
    createdAt: '2025-12-08T21:00:00+09:00',
  },
];
