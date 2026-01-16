'use client';
import { ModalProvider } from '@/components/ui/modal';
import { ToastProvider } from '@/components/ui/toast/core';
import {
  AuthProvider,
  LazyMotionProvider,
  MSWProvider,
  NotificationProvider,
  QueryProvider,
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
          <NotificationProvider hasRefreshToken={hasRefreshToken}>
            <LazyMotionProvider>
              <ToastProvider>
                <ModalProvider>{children}</ModalProvider>
              </ToastProvider>
            </LazyMotionProvider>
          </NotificationProvider>
        </AuthProvider>
      </MSWProvider>
    </QueryProvider>
  );
};
