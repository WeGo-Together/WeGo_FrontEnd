import { http, HttpResponse } from 'msw';

import { mockProductItem, mockProductList } from './product-mock';

const getProductItemMock = http.get(
  `${process.env.NEXT_PUBLIC_API_URL}/products/:id`,
  ({ params }) => {
    return HttpResponse.json({
      ...mockProductItem,
      id: Number(params.id),
      name: `아이템 ${Number(params.id)}`,
    });
  },
);

const getProductListMock = http.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, () => {
  return HttpResponse.json(mockProductList);
});

export const productHandlers = [
  getProductItemMock, // 상품 상세
  getProductListMock, // 상품 목록
];
