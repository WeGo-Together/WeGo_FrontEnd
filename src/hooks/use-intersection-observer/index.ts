import { useEffect, useRef } from 'react';

import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';

interface UseIntersectionObserverParams {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  root?: Element | null;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = INTERSECTION_OBSERVER_THRESHOLD,
  root = null,
}: UseIntersectionObserverParams) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersectRef.current();
        }
      },
      {
        threshold,
        root,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, threshold, root]);

  return targetRef;
};
