'use client';
import { ModalProvider } from '@/components/ui/modal';
import { ToastProvider } from '@/components/ui/toast/core';
import { LazyMotionProvider, MSWProvider, QueryProvider } from '@/providers';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>
        <LazyMotionProvider>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </LazyMotionProvider>
      </MSWProvider>
    </QueryProvider>
  );
};
