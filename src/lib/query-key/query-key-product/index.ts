import { GetProductListParams } from '@/types/endpoints/products/types';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'],
  list: (params?: GetProductListParams) => [...productKeys.all, 'list', params || {}] as const,
  items: () => [...productKeys.all, 'item'],
  item: (id: number) => [...productKeys.all, 'item', id] as const,
};
