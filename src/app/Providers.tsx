'use client';
import { LazyMotionProvider, MSWProvider, QueryProvider } from '@/providers';

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
