import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';

import { httpClient } from '@/api/httpClient';
import { productKeys } from '@/lib/query-key/query-key-product';
import { ProductListParams, ProductListResponse } from '@/types/endpoints/products/types';

// 상품 목록 조회 기본 API - OK
export const getProducts = async (params?: ProductListParams) => {
  const response = await httpClient<ProductListResponse>(`/products`, {
    params,
    method: 'GET',
  });
  return response;
};

// 상품 목록 조회 prefetchInfiniteQuery - OK
export const prefetchProductsInfinite = async (
  queryClient: QueryClient,
  params?: ProductListParams,
) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getProducts({ ...params, cursor: pageParam }),
    initialPageParam: undefined as undefined | number,
  });
};

// 상품 목록 조회 useInfiniteQuery - OK
export const useGetProductsInfinite = (params?: ProductListParams) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getProducts({ ...params, cursor: pageParam }),
    initialPageParam: undefined as undefined | number,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.list),
      pageParams: data.pageParams,
    }),
  });
};
