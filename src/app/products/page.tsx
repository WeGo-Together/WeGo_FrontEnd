'use client';
import { useEffect } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { prefetchProductsInfinite } from '@/api/endpoints/product/product-get-list';
import { getQueryClient } from '@/lib/queryClient';

import List from './List';

const ProductsPage = () => {
  const queryClient = getQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      await prefetchProductsInfinite(queryClient);
    };
    fetchData();
  }, []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <List />
    </HydrationBoundary>
  );
};

export default ProductsPage;
