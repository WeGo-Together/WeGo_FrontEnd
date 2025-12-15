'use client';

import Image, { ImageProps } from 'next/image';

import { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallbackSrc?: string;
}

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

export const ImageWithFallback = ({
  src,
  fallbackSrc = DEFAULT_PROFILE_IMAGE,
  ...rest
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(false);
  }, [src]);

  const imgSrc = error || !src || src === 'null' ? fallbackSrc : src;

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={(e) => {
        e.preventDefault();
        setError(true);
      }}
    />
  );
};
