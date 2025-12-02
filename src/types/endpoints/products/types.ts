// 상품 기본 TYPE
export interface ProductItemType {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}

// 상품 목록 요청 TYPE
export interface GetProductListParams {
  cursor?: number;
  order?: 'recent' | 'reviewCount' | 'rating';
  keyword?: string;
  category?: number;
}

// 상품 목록 응답 TYPE
export interface GetProductListResponse {
  nextCursor: number | null;
  list: ProductItemType[];
}

// 상품 상세 요청 TYPE
export interface GetProductItemParams {
  productId: number;
}

// 상품 상세 응답 TYPE
export interface GetProductItemResponse extends ProductItemType {
  description: string;
  category: {
    id: number;
    name: string;
  };
  isFavorite: boolean;
  categoryMetric: {
    rating: number;
    reviewCount: number;
    favoriteCount: number;
  };
}

// 상품 생성 요청 TYPE
export interface CreateProductItemParams {
  categoryId: number;
  image: string;
  description: string;
  name: string;
}
