import { type ComponentProps } from 'react';

import { iconComponentMap } from './registry';

export const iconMetadataMap = [
  { id: 'arrow-down', variant: 'dynamic' },
  { id: 'arrow-up', variant: 'dynamic' },
  { id: 'bell-read', variant: 'dynamic' },
  { id: 'calendar-1', variant: 'dynamic' },
  { id: 'calendar-2', variant: 'dynamic' },
  { id: 'check', variant: 'dynamic' },
  { id: 'chevron-left-1', variant: 'dynamic' },
  { id: 'chevron-left-2', variant: 'dynamic' },
  { id: 'chevron-right-1', variant: 'dynamic' },
  { id: 'clock', variant: 'dynamic' },
  { id: 'edit-bar', variant: 'dynamic' },
  { id: 'edit', variant: 'dynamic' },
  { id: 'heart', variant: 'dynamic' },
  { id: 'home', variant: 'dynamic' },
  { id: 'kebab', variant: 'dynamic' },
  { id: 'map-pin-1', variant: 'dynamic' },
  { id: 'map-pin-2', variant: 'dynamic' },
  { id: 'message', variant: 'dynamic' },
  { id: 'plus', variant: 'dynamic' },
  { id: 'search', variant: 'dynamic' },
  { id: 'send', variant: 'dynamic' },
  { id: 'small-x-1', variant: 'dynamic' },
  { id: 'small-x-2', variant: 'dynamic' },
  { id: 'symbol', variant: 'dynamic' },
  { id: 'tag', variant: 'dynamic' },
  { id: 'user-1', variant: 'dynamic' },
  { id: 'user-2', variant: 'dynamic' },
  { id: 'users-1', variant: 'dynamic' },
  { id: 'users-2', variant: 'dynamic' },
  { id: 'x-1', variant: 'dynamic' },
  { id: 'x-2', variant: 'dynamic' },
  { id: 'bell-unread', variant: 'resizable' },
  { id: 'congratulate', variant: 'resizable' },
  { id: 'empty', variant: 'resizable' },
  { id: 'google-login', variant: 'resizable' },
  { id: 'kick', variant: 'resizable' },
  { id: 'not-found', variant: 'resizable' },
  { id: 'plus-circle', variant: 'resizable' },
  { id: 'visibility-false', variant: 'resizable' },
  { id: 'visibility-true', variant: 'resizable' },
  { id: 'wego-logo', variant: 'resizable' },
] as const;

export type IconId = (typeof iconMetadataMap)[number]['id'];

type IconProps = ComponentProps<'svg'> & {
  id: IconId;
  size?: number;
};

export const Icon = ({ id, size = 24, ...props }: IconProps) => {
  const IconComponent = iconComponentMap[id];
  return <IconComponent width={size} height={size} {...props} />;
};
