'use client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getProducts } from '@/api/endpoints/product/product-get-list';
import { productKeys } from '@/lib/query-key';
import { GetProductListParams } from '@/types/endpoints/products/types';

export const useGetProductsInfinite = (params?: GetProductListParams) => {
  const query = useInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ pageParam }) => getProducts({ ...params, cursor: pageParam }),
    initialPageParam: params?.cursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => data?.pages.flatMap((page) => page.list) || [],
  });
  return query;
};
