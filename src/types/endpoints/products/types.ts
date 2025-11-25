// 상품 기본 TYPE
export interface ProductItem {
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
export interface ProductListParams {
  cursor?: number;
  order?: 'recent' | 'reviewCount' | 'rating';
  keyword?: string;
  category?: number;
}

// 상품 목록 응답 TYPE
export interface ProductListResponse {
  nextCursor: number | null;
  list: ProductItem[];
}

// 상품 상세 요청 TYPE
export interface ProductItemParams {
  productId: number;
}

// 상품 상세 응답 TYPE
export interface ProductItemResponse extends ProductItem {
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
