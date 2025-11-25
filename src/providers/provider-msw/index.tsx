// src/providers/MSWProvider.tsx

'use client';

import { Suspense, use } from 'react';

import { initMocks } from '@/mock';

// use 훅에서 사용하기 위해 Promise 생성
// use 훅의 목적: React 컴포넌트 내에서 비동기 작업의 완료를 기다림
// <-> useEffect는 컴포넌트 렌더링 후에 비동기 작업(모킹 설정)을 수행하기 때문에 제대로 모킹이 되지 않음

// 1. 서버사이드에서 실행될 경우 즉시 Promise를 완료시켜 자식 컴포넌트가 즉시 렌더링될 수 있도록 한다.
// 2. 클라이언트 사이드에서 실행될 경우 Promise를 반환하는 initMocks 함수가 완료될 때까지 기다린다.
const mockingEnabledPromise = typeof window === 'undefined' ? Promise.resolve() : initMocks();

// 3. use 훅을 사용하여 mockingEnabledPromise가 완료될 때까지 기다린다. (Suspense의 fallback이 표시됨)
// 4. Promise가 완료되면 자식 컴포넌트를 렌더링한다.
const MSWProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  use(mockingEnabledPromise);
  return children;
};

// 5. Suspense 컴포넌트를 사용하여 MSWProviderWrapper가 비동기 작업이 완료될 때까지 대기하도록 감싼다.
export const MSWProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
};
