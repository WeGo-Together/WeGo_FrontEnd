'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { SearchBar } from '@/components/shared';

export const GroupSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentKeyword = searchParams.get('keyword') || '';

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
    } else {
      params.delete('keyword');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <SearchBar
      className='h-11'
      defaultValue={currentKeyword}
      placeholder='원하는 모임을 검색해보세요'
      onSearch={handleSearch}
    />
  );
};
