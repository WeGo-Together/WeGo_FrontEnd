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
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>
        <AuthProvider>
          <NotificationProvider>
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
