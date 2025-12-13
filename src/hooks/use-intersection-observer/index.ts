import { useEffect, useRef } from 'react';

import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';

interface UseIntersectionObserverParams {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
}

export const useIntersectionObserver = ({
  onIntersect, // 요소가 화면에 보일 때 실행할 콜백 함수
  enabled = true, // observer 활성화 여부 (기본값: true)
  threshold = INTERSECTION_OBSERVER_THRESHOLD, // 요소가 얼마나 보여야 감지할지 (기본값: 10%로 설정)
}: UseIntersectionObserverParams) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect, enabled, threshold]);

  return targetRef;
};
