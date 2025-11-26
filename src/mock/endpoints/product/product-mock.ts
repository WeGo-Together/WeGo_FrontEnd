import { GetProductItemResponse, GetProductListResponse } from '@/types/endpoints/products/types';

export const mockProductList: GetProductListResponse = {
  nextCursor: null,
  list: [
    {
      id: 1,
      name: '첫 번째 아이템',
      image: 'https://',
      rating: 3,
      reviewCount: 2,
      categoryId: 7,
      createdAt: '2025-10-05T11:22:46.535Z',
      updatedAt: '2025-10-05T11:22:46.535Z',
      writerId: 832,
      favoriteCount: 0,
    },
    {
      id: 2,
      name: '두 번째 아이템',
      image: 'https://',
      rating: 3,
      reviewCount: 2,
      categoryId: 7,
      createdAt: '2025-10-05T11:22:46.535Z',
      updatedAt: '2025-10-05T11:22:46.535Z',
      writerId: 832,
      favoriteCount: 0,
    },
  ],
};

export const mockProductItem: GetProductItemResponse = {
  id: 1,
  name: `아이템 1`,
  image: 'https://via.placeholder.com/150',
  rating: 4.666666666666667,
  reviewCount: 18,
  categoryId: 1,
  createdAt: '2024-01-29T09:08:53.607Z',
  updatedAt: '2025-08-20T07:55:50.261Z',
  writerId: 1,
  description: 'description',
  category: {
    id: 1,
    name: '음악',
  },
  isFavorite: false,
  favoriteCount: 1,
  categoryMetric: {
    rating: 0.6444444444444445,
    reviewCount: 1.4666666666666668,
    favoriteCount: 0.06666666666666667,
  },
};
