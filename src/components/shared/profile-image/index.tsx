import type { ImageProps } from 'next/image';

import { cva, type VariantProps } from 'class-variance-authority';
import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { ImageWithFallback } from '@/components/ui';
import { cn } from '@/lib/utils';

const profileVariants = cva('object-cover overflow-hidden rounded-full select-none', {
  variants: {
    size: {
      xl: 'size-24',
      lg: 'size-16',
      md: 'size-12',
      sm: 'size-10',
      xs: 'size-4',
    },
  },
});

interface Props extends Omit<ImageProps, 'src' | 'onError' | 'alt'> {
  src: string | null;
  size: NonNullable<VariantProps<typeof profileVariants>['size']>;
}

export const ProfileImage = ({ src, size, className, ...rest }: Props) => {
  return (
    <ImageWithFallback
      {...rest}
      {...DEFAULT_WIDTH_HEIGHT[size]}
      className={cn(profileVariants({ size }), className)}
      alt='프로필 이미지'
      fallbackSrc={DEFAULT_PROFILE_IMAGE}
      src={src}
    />
  );
};

const DEFAULT_WIDTH_HEIGHT = Object.freeze({
  xl: {
    width: 96,
    height: 96,
  },
  lg: {
    width: 64,
    height: 64,
  },
  md: {
    width: 48,
    height: 48,
  },
  sm: {
    width: 40,
    height: 40,
  },
  xs: {
    width: 16,
    height: 16,
  },
});
