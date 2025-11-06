'use client';

import { useEffect } from 'react';

const config = {
  enabledInDevelopment: true,
  enabledInProduction: false,
  serviceWorkerUrl: '/mockServiceWorker.js',
  onUnhandledRequest: 'bypass' as const,
};

interface Props {
  children: React.ReactNode;
}

export const MSWProvider = ({ children }: Props) => {
  useEffect(() => {
    const initMSW = async () => {
      // MSW 활성화 여부 확인
      const isDev = process.env.NODE_ENV === 'development';
      const shouldEnable = isDev ? config.enabledInDevelopment : config.enabledInProduction;

      if (shouldEnable) {
        try {
          const { worker } = await import('@/mock/browser');
          await worker.start({
            onUnhandledRequest: config.onUnhandledRequest,
            serviceWorker: { url: config.serviceWorkerUrl },
          });

          console.log('🔷 MSW Client ready');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.warn('⚠️  MSW Client setup failed:', errorMessage);
        }
      }
    };

    initMSW();
  }, []);

  return children;
};

// 서버 MSW 자동 초기화
if (typeof window === 'undefined') {
  (async () => {
    try {
      // MSW 활성화 여부 확인
      const isDev = process.env.NODE_ENV === 'development';
      const shouldEnable = isDev ? config.enabledInDevelopment : config.enabledInProduction;

      if (shouldEnable) {
        const { server } = await import('@/mock/server');
        server.listen({ onUnhandledRequest: config.onUnhandledRequest });
        console.log('🔶 MSW Server ready');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn('⚠️  MSW Server setup failed:', errorMessage);
    }
  })();
}
