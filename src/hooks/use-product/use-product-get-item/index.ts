'use client';
import { useQuery } from '@tanstack/react-query';

import { getProduct } from '@/api/endpoints/product/product-get-item';
import { productKeys } from '@/lib/query-key';

export const useGetProduct = (id: number) => {
  const query = useQuery({
    queryKey: productKeys.item(id),
    queryFn: () => getProduct(id),
  });
  return query;
};
