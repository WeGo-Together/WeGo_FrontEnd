// This file is auto-generated. Do not edit manually.
import { type ComponentProps } from 'react';

import type { IconMetadata } from 'flexisvg';

export type DynamicIconId =
  | 'arrow-down'
  | 'arrow-up'
  | 'bell-read'
  | 'calendar-1'
  | 'calendar-2'
  | 'check'
  | 'chevron-left-1'
  | 'chevron-left-2'
  | 'chevron-right-1'
  | 'clock'
  | 'edit-bar'
  | 'edit'
  | 'heart'
  | 'home'
  | 'kebab'
  | 'map-pin-1'
  | 'map-pin-2'
  | 'message'
  | 'plus'
  | 'search'
  | 'send'
  | 'small-x-1'
  | 'small-x-2'
  | 'symbol'
  | 'tag'
  | 'user-1'
  | 'user-2'
  | 'users-1'
  | 'users-2'
  | 'x-1'
  | 'x-2';
export type ResizableIconId =
  | 'bell-unread'
  | 'congratulate'
  | 'empty'
  | 'google-login'
  | 'kick'
  | 'not-found'
  | 'plus-circle'
  | 'visibility-false'
  | 'visibility-true'
  | 'wego-logo';

export type IconId = DynamicIconId | ResizableIconId;

type IconProps = ComponentProps<'svg'> & {
  id: IconId;
  size?: number;
};

export const Icon = ({ id, size = 24, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} {...props}>
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  );
};

export const iconMetadataMap: IconMetadata[] = [
  {
    id: 'arrow-down',
    variant: 'dynamic',
  },
  {
    id: 'arrow-up',
    variant: 'dynamic',
  },
  {
    id: 'bell-read',
    variant: 'dynamic',
  },
  {
    id: 'calendar-1',
    variant: 'dynamic',
  },
  {
    id: 'calendar-2',
    variant: 'dynamic',
  },
  {
    id: 'check',
    variant: 'dynamic',
  },
  {
    id: 'chevron-left-1',
    variant: 'dynamic',
  },
  {
    id: 'chevron-left-2',
    variant: 'dynamic',
  },
  {
    id: 'chevron-right-1',
    variant: 'dynamic',
  },
  {
    id: 'clock',
    variant: 'dynamic',
  },
  {
    id: 'edit-bar',
    variant: 'dynamic',
  },
  {
    id: 'edit',
    variant: 'dynamic',
  },
  {
    id: 'heart',
    variant: 'dynamic',
  },
  {
    id: 'home',
    variant: 'dynamic',
  },
  {
    id: 'kebab',
    variant: 'dynamic',
  },
  {
    id: 'map-pin-1',
    variant: 'dynamic',
  },
  {
    id: 'map-pin-2',
    variant: 'dynamic',
  },
  {
    id: 'message',
    variant: 'dynamic',
  },
  {
    id: 'plus',
    variant: 'dynamic',
  },
  {
    id: 'search',
    variant: 'dynamic',
  },
  {
    id: 'send',
    variant: 'dynamic',
  },
  {
    id: 'small-x-1',
    variant: 'dynamic',
  },
  {
    id: 'small-x-2',
    variant: 'dynamic',
  },
  {
    id: 'symbol',
    variant: 'dynamic',
  },
  {
    id: 'tag',
    variant: 'dynamic',
  },
  {
    id: 'user-1',
    variant: 'dynamic',
  },
  {
    id: 'user-2',
    variant: 'dynamic',
  },
  {
    id: 'users-1',
    variant: 'dynamic',
  },
  {
    id: 'users-2',
    variant: 'dynamic',
  },
  {
    id: 'x-1',
    variant: 'dynamic',
  },
  {
    id: 'x-2',
    variant: 'dynamic',
  },
  {
    id: 'bell-unread',
    variant: 'resizable',
  },
  {
    id: 'congratulate',
    variant: 'resizable',
  },
  {
    id: 'empty',
    variant: 'resizable',
  },
  {
    id: 'google-login',
    variant: 'resizable',
  },
  {
    id: 'kick',
    variant: 'resizable',
  },
  {
    id: 'not-found',
    variant: 'resizable',
  },
  {
    id: 'plus-circle',
    variant: 'resizable',
  },
  {
    id: 'visibility-false',
    variant: 'resizable',
  },
  {
    id: 'visibility-true',
    variant: 'resizable',
  },
  {
    id: 'wego-logo',
    variant: 'resizable',
  },
];
