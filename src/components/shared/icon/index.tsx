import { type ComponentProps } from 'react';

import { IconId } from '@/types/icons';

type IconProps = ComponentProps<'svg'> & {
  id: IconId;
};

export const Icon = ({ id, ...props }: IconProps) => {
  return (
    <svg width='24' height='24' {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
