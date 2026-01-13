import type { ImageProps } from 'next/image';

import { cva, type VariantProps } from 'class-variance-authority';
import { DEFAULT_GROUP_IMAGE, DEFAULT_GROUP_LIST_IMAGE } from 'constants/default-images';

import { ImageWithFallback } from '@/components/ui';
import { cn } from '@/lib/utils';

const GroupImageVariants = cva('object-cover overflow-hidden select-none', {
  variants: {
    size: {
      xl: 'w-110 h-60',
      lg: 'size-25 rounded-2xl',
      md: 'size-20 rounded-2xl',
      sm: 'size-14 rounded-[10px]',
    },
  },
});

interface Props extends Omit<ImageProps, 'src' | 'onError' | 'alt'> {
  src: string | null;
  size: NonNullable<VariantProps<typeof GroupImageVariants>['size']>;
}

export const GroupImage = ({ src, size, className, ...rest }: Props) => {
  const defaultImage = size === 'lg' ? DEFAULT_GROUP_IMAGE : DEFAULT_GROUP_LIST_IMAGE;

  return (
    <ImageWithFallback
      {...rest}
      {...DEFAULT_WIDTH_HEIGHT[size]}
      className={cn(GroupImageVariants({ size }), className)}
      alt='모임 이미지'
      fallbackSrc={defaultImage}
      src={src}
    />
  );
};

const DEFAULT_WIDTH_HEIGHT = Object.freeze({
  xl: {
    width: 440,
    height: 240,
  },
  lg: {
    width: 100,
    height: 100,
  },
  md: {
    width: 80,
    height: 80,
  },
  sm: {
    width: 56,
    height: 56,
  },
});
