export const groupKeys = {
  all: ['group'] as const,
  lists: () => [...groupKeys.all, 'list'] as const,
  list: (filters: { keyword?: string; cursor?: number; size: number }) =>
    [...groupKeys.lists(), filters] as const,
};
