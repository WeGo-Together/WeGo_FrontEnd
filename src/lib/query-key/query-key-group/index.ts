export const groupKeys = {
  all: ['group'] as const,
  lists: () => [...groupKeys.all, 'list'] as const,
  list: (filters: { keyword?: string; cursor?: number; size: number }) =>
    [...groupKeys.lists(), filters] as const,
  myLists: () => [...groupKeys.all, 'me'] as const,
  myList: (filters: { type: 'current' | 'myPost' | 'past'; cursor?: number; size: number }) =>
    [...groupKeys.myLists(), filters] as const,
  detail: (groupId: string) => [...groupKeys.all, groupId] as const,
  joinRequests: (groupId: string, status: string = 'PENDING') =>
    ['joinRequests', groupId, status] as const,
};
