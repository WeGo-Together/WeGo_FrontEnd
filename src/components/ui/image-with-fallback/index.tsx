'use client';

import Image, { ImageProps } from 'next/image';

import { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string | null;
  fallbackSrc: string;
}

export const ImageWithFallback = ({ src, fallbackSrc, ...rest }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(false);
  }, [src]);

  const imgSrc = error || !src || src === null ? fallbackSrc : src;

  return (
    <Image
      {...rest}
      draggable={false}
      loading='eager'
      quality={100}
      src={imgSrc}
      unoptimized
      onError={(e) => {
        e.preventDefault();
        setError(true);
      }}
    />
  );
};
