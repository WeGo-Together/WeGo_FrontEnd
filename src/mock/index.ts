// src/mocks/index.ts

import { SetupWorker } from 'msw/browser';

import { handlers } from './handlers';

// 전역 객체에 워커 인스턴스 자체를 저장
declare global {
  interface Window {
    mswWorker?: SetupWorker;
  }
}

const config = {
  enabledInDevelopment: false,
  enabledInProduction: false,
  onUnhandledRequest: 'bypass' as const, // bypass | warn | error
};

export const initMocks = async () => {
  // MSW 활성화 여부 확인
  const isDev = process.env.NODE_ENV === 'development';
  const shouldEnable = isDev ? config.enabledInDevelopment : config.enabledInProduction;
  if (!shouldEnable) return;

  if (typeof window === 'undefined') {
    // Server
    const { server } = await import('./server');
    server.listen({
      onUnhandledRequest: config.onUnhandledRequest,
    });
    console.log('🔶 MSW Server ready');
  } else {
    // Client
    // 워커 인스턴스가 전역에 이미 존재하는지 확인
    if (!window.mswWorker) {
      const { worker } = await import('./browser');
      // 워커 인스턴스를 전역에 저장
      window.mswWorker = worker;
      // 핸들러 주입
      worker.use(...handlers);
      // 최초 실행: start()
      await worker.start({
        onUnhandledRequest: config.onUnhandledRequest,
      });
      console.log('🔷 MSW Client ready');
    } else {
      // 이미 존재하는 경우 worker 재사용
      const worker = window.mswWorker;
      // 새로운 핸들러 주입 (기존 핸들러를 덮어씀)
      worker.resetHandlers(...handlers);
    }
  }
};
