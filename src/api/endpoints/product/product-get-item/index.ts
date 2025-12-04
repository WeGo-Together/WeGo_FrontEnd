import { httpClient } from '@/api/httpClient';
import { GetProductItemResponse } from '@/types/endpoints/products/types';

// 상품 상세 조회 기본 API - OK
export const getProduct = async (id: number) => {
  const response = await httpClient<GetProductItemResponse>(`/products/${id}`, {
    method: 'POST',
  });
  return response;
};
