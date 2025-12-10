import React, { useEffect, useRef, useState } from 'react';

import * as m from 'motion/react-m';

interface Props {
  children: React.ReactNode;
}

export const AnimateDynamicHeight = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <m.div style={{ height }} animate={{ height }} transition={{ duration: 0.15 }}>
      <div ref={containerRef}>{children}</div>
    </m.div>
  );
};
