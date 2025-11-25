// import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
'use client';
import { useGetProduct } from '@/api/endpoints/product/product-get-item';

// import { prefetchProductsInfinite } from '@/api/endpoints/templates/getProductApi';
// import { getQueryClient } from '@/lib/queryClient';

// import List from './List';

// // import { httpClient } from '@/api/httpClient';

// // src/app/page.tsx
// const Page = async () => {
//   const queryClient = getQueryClient();

//   await prefetchProductsInfinite(queryClient);

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <List />
//     </HydrationBoundary>
//   );
// };

// export default Page;

// 'use client';
// import { useGetProducts } from '@/api/endpoints/templates/getProductApi';

// export default function Page() {
//   const { data, isPending } = useGetProducts();
//   return (
//     <div>
//       {isPending && <div>로딩중</div>}
//       {data && <div>{data.list.map((item) => item.name)}</div>}
//     </div>
//   );
// }

export default function Page() {
  const { data } = useGetProduct(1);
  return (
    <div>
      {data && (
        <div>
          {data.id}
          {data.name}
        </div>
      )}
    </div>
  );
}
