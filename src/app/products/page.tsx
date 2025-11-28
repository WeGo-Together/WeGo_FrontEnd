'use client';

import { useGetProductsInfinite } from '@/hooks/use-product/use-product-get-list';

const ProductsPage = () => {
  const { data, fetchNextPage } = useGetProductsInfinite({
    keyword: '',
  });
  return (
    <div>
      <div>
        {data?.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <button onClick={() => fetchNextPage()}>next</button>
    </div>
  );
};

export default ProductsPage;
