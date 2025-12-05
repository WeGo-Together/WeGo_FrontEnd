'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

export interface Tab {
  label: string;
  value: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  paramName?: string;
  basePath?: string;
}

interface TabItemProps {
  label: string;
  href: string;
  isActive: boolean;
}

const TAB_TEXT_STYLES = {
  base: 'flex h-full items-center justify-center text-text-sm-semibold transition-colors',
  active: 'text-mint-600',
  inactive: 'text-gray-600',
} as const;

const INDICATOR_STYLES = 'absolute bottom-0 left-0 z-10 h-[2px] w-full bg-mint-500';
const BASE_LINE_STYLES = 'absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200';

const TabItem = ({ label, href, isActive }: TabItemProps) => (
  <li className='relative flex-1'>
    <Link
      href={href}
      className={cn(
        TAB_TEXT_STYLES.base,
        isActive ? TAB_TEXT_STYLES.active : TAB_TEXT_STYLES.inactive,
      )}
    >
      {label}
    </Link>
    {isActive && <span className={INDICATOR_STYLES} />}
  </li>
);

export const TabNavigation = ({ tabs, paramName = 'tab', basePath = '' }: TabNavigationProps) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get(paramName) || tabs[0].value;

  return (
    <nav className='sticky top-0 z-50 h-11 bg-white'>
      <ul className='flex h-full w-full px-4'>
        {tabs.map((tab) => (
          <TabItem
            key={tab.value}
            href={`${basePath}?${paramName}=${tab.value}`}
            isActive={currentTab === tab.value}
            label={tab.label}
          />
        ))}
      </ul>
      <div className={BASE_LINE_STYLES} />
    </nav>
  );
};
