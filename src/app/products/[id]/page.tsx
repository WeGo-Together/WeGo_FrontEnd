'use client';
import { use } from 'react';

import { useGetProduct } from '@/hooks/use-product/use-product-get-item';

interface ProductItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductItemPage = ({ params }: ProductItemPageProps) => {
  const { id } = use(params);
  const { data } = useGetProduct(Number(id));

  return (
    <div>
      {data?.id}
      {data?.name}
    </div>
  );
};

export default ProductItemPage;
