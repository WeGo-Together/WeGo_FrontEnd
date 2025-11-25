'use client';

import { useGetProductsInfinite } from '@/api/endpoints/product/product-get-list';

const List = () => {
  const { data, fetchNextPage } = useGetProductsInfinite();

  return (
    <div>
      <div>
        {data?.pages.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <button onClick={() => fetchNextPage()}>next</button>
    </div>
  );
};

export default List;
