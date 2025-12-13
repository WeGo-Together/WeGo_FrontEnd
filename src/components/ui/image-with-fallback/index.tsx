'use client';

import Image, { ImageProps } from 'next/image';

import { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallbackSrc?: string;
}

export const ImageWithFallback = ({
  src,
  fallbackSrc = 'https://plus.unsplash.com/premium_photo-1738592736106-a17b897c0ab1?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ...rest
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(false);
  }, [src]);

  const imgSrc = error || !src || src === 'null' ? fallbackSrc : src;

  return <Image {...rest} src={imgSrc} unoptimized onError={() => setError(true)} />;
};
