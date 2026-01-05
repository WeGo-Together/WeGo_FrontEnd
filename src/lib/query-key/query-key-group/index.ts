export const groupKeys = {
  all: ['group'] as const,
  lists: () => [...groupKeys.all, 'list'] as const,
  list: (filters: { keyword?: string; cursor?: number; size: number }) =>
    [...groupKeys.lists(), filters] as const,
  myGroups: () => ['myGroups'] as const,
  myGroupsList: (type: 'current' | 'myPost' | 'past') => [...groupKeys.myGroups(), type] as const,
  detail: (groupId: string) => [...groupKeys.all, groupId] as const,
  joinRequests: (groupId: string, status: string = 'PENDING') =>
    ['joinRequests', groupId, status] as const,
};
