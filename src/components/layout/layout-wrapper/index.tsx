'use client';

import { usePathname } from 'next/navigation';

import { useMemo } from 'react';

import { GNB } from '@/components/layout/gnb';
import { Header } from '@/components/layout/header';
import { GroupSearch } from '@/components/pages/group-search';

interface Props {
  children: React.ReactNode;
}

export const LayoutWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  const { headerHeightClass, headerHeightPx, isRoot } = useMemo(() => {
    const isRootPage = pathname === '/';
    return {
      headerHeightClass: isRootPage ? 'h-28' : 'h-14', // 루트: 112px, 그 외: 56px
      headerHeightPx: isRootPage ? 112 : 56,
      isRoot: isRootPage,
    };
  }, [pathname]);

  const mainMinHeight = `calc(100vh - ${headerHeightPx + 56}px)`;

  return (
    <div className='relative mx-auto max-w-110 bg-gray-100'>
      <Header heightClass={headerHeightClass} searchBar={isRoot ? <GroupSearch /> : undefined} />
      <main className='min-h-[calc(100vh-112px)]' style={{ minHeight: mainMinHeight }}>
        {children}
      </main>
      <GNB />
    </div>
  );
};
