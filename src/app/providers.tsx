'use client';
import { ModalProvider } from '@/components/ui/modal';
import { ToastProvider } from '@/components/ui/toast/core';
import {
  AuthProvider,
  LazyMotionProvider,
  MSWProvider,
  QueryProvider,
  SSEProvider,
} from '@/providers';

interface Props {
  children: React.ReactNode;
  hasRefreshToken: boolean;
}

export const Providers = ({ children, hasRefreshToken }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>
        <AuthProvider hasRefreshToken={hasRefreshToken}>
          <SSEProvider>
            <LazyMotionProvider>
              <ToastProvider>
                <ModalProvider>{children}</ModalProvider>
              </ToastProvider>
            </LazyMotionProvider>
          </SSEProvider>
        </AuthProvider>
      </MSWProvider>
    </QueryProvider>
  );
};
