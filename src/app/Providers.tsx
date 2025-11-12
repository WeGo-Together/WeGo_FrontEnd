'use client';
import LazyMotionProvider from '@/providers/LazyMotionProvider';
import { MSWProvider } from '@/providers/MSWProvider';
import { QueryProvider } from '@/providers/QueryProvider';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>
        <LazyMotionProvider>{children}</LazyMotionProvider>
      </MSWProvider>
    </QueryProvider>
  );
};
