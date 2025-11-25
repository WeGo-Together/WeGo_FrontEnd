import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { prefetchProduct } from '@/api/endpoints/product/product-get-item';
import { getQueryClient } from '@/lib/queryClient';

import Item from './Item';

interface ProductItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductItemPage = async ({ params }: ProductItemPageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  await prefetchProduct(queryClient, Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Item />
    </HydrationBoundary>
  );
};

export default ProductItemPage;
