import { QueryClient, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getProduct } from '@/api/endpoints/product/product-get-item';
import { productKeys } from '@/lib/query-key';
import { ProductItemResponse } from '@/types/endpoints/products/types';

// 상품 상세 조회 useQuery - OK
export const useGetProduct = (id: number, options?: UseQueryOptions<ProductItemResponse>) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    ...options,
  });
};

// 상품 상세 조회 prefetchQuery - OK
export const prefetchProduct = async (queryClient: QueryClient, id: number) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
  });
};
