export const userKeys = {
  all: ['user'] as const,
  items: () => [...userKeys.all, 'item'],
  item: (id: number) => [...userKeys.all, 'item', id] as const,
};
