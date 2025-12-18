'use client';
import { ModalProvider } from '@/components/ui/modal';
import { ToastProvider } from '@/components/ui/toast/core';
import { LazyMotionProvider, MSWProvider, NotificationProvider, QueryProvider } from '@/providers';
import { TokenProvider } from '@/providers/provider-token';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>
        <LazyMotionProvider>
          <ToastProvider>
            <ModalProvider>
              <TokenProvider>
                <NotificationProvider>{children}</NotificationProvider>
              </TokenProvider>
            </ModalProvider>
          </ToastProvider>
        </LazyMotionProvider>
      </MSWProvider>
    </QueryProvider>
  );
};
