// src/mocks/index.ts

import { SetupWorker } from 'msw/browser';

import { handlers } from './handlers';

// 전역 객체에 워커 인스턴스 자체를 저장
declare global {
  interface Window {
    mswWorker?: SetupWorker;
  }
}

export const initMocks = async () => {
  // 개발 환경이 아니라면 실행 X
  if (process.env.NODE_ENV !== 'development') return;
  if (typeof window === 'undefined') {
    // 서버 사이드d
    const { server } = await import('./server');
    return server.listen();
  } else {
    // 워커 인스턴스가 전역에 이미 존재하는지 확인
    if (!window.mswWorker) {
      const { worker } = await import('./browser');
      // 워커 인스턴스를 전역에 저장
      window.mswWorker = worker;
      // 핸들러 주입
      worker.use(...handlers);
      // 최초 실행: start()
      await worker.start();
    } else {
      // 이미 존재하는 경우 worker 재사용
      const worker = window.mswWorker;
      // 새로운 핸들러 주입
      worker.use(...handlers);
    }
  }
};
