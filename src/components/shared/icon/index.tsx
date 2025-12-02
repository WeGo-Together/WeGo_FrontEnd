import { type ComponentProps } from 'react';

type IconId =
  | 'calender'
  | 'chevron-down'
  | 'chevron-true'
  | 'congratulate'
  | 'home'
  | 'map-pin'
  | 'message'
  | 'plus'
  | 'plus-circle'
  | 'search'
  | 'unread-false'
  | 'unread-true'
  | 'user'
  | 'users'
  | 'visibility-false'
  | 'visibility-true'
  | 'x';

type IconProps = ComponentProps<'svg'> & {
  id: IconId;
};

export default function Icon({ id, ...props }: IconProps) {
  return (
    <svg width='24' height='24' {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
