'use client';

// use
// import * as m from "motion/react-m";
// instead of
// import { motion } from "motion/react";

import { LazyMotion } from 'motion/react';

const loadFeatures = () => import('@/lib/feature').then((res) => res.default);

export const LazyMotionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
};
