'use client';
import { ModalProvider } from '@/components/ui/modal';
import { LazyMotionProvider, MSWProvider, QueryProvider } from '@/providers';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>
        <LazyMotionProvider>
          <ModalProvider>{children}</ModalProvider>
        </LazyMotionProvider>
      </MSWProvider>
    </QueryProvider>
  );
};
