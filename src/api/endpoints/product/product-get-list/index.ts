import { httpClient } from '@/api/httpClient';
import { GetProductListParams, GetProductListResponse } from '@/types/endpoints/products/types';

// 상품 목록 조회 기본 API - OK
export const getProducts = async (params?: GetProductListParams) => {
  const response = await httpClient<GetProductListResponse>(`/products`, {
    params,
    method: 'GET',
  });
  return response;
};
