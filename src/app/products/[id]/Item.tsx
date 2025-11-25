'use client';

import { useGetProduct } from '@/api/endpoints/product/product-get-item';

const Item = () => {
  const { data } = useGetProduct(1);
  return (
    <div>
      {data && (
        <div>
          <div>
            <span>상품 ID: </span>
            <span>{data.id}</span>
          </div>
          <div>
            <span>상품 이름: </span>
            <span>{data.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
