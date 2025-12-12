'use client';

import Image, { ImageProps } from 'next/image';

import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallbackSrc?: string;
}

export const ImageWithFallback = ({
  src,
  fallbackSrc = '/images/image-profile-default.png',
  ...rest
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />;
};
