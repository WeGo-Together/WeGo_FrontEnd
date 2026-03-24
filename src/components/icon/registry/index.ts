import { type FC, type SVGProps } from 'react';

import IconArrowDown from '../../../../public/icons/dynamic/icon-arrow-down.svg';
import IconArrowUp from '../../../../public/icons/dynamic/icon-arrow-up.svg';
import IconBellRead from '../../../../public/icons/dynamic/icon-bell-read.svg';
import IconCalendar1 from '../../../../public/icons/dynamic/icon-calendar-1.svg';
import IconCalendar2 from '../../../../public/icons/dynamic/icon-calendar-2.svg';
import IconCheck from '../../../../public/icons/dynamic/icon-check.svg';
import IconChevronLeft1 from '../../../../public/icons/dynamic/icon-chevron-left-1.svg';
import IconChevronLeft2 from '../../../../public/icons/dynamic/icon-chevron-left-2.svg';
import IconChevronRight1 from '../../../../public/icons/dynamic/icon-chevron-right-1.svg';
import IconClock from '../../../../public/icons/dynamic/icon-clock.svg';
import IconEdit from '../../../../public/icons/dynamic/icon-edit.svg';
import IconEditBar from '../../../../public/icons/dynamic/icon-edit-bar.svg';
import IconHeart from '../../../../public/icons/dynamic/icon-heart.svg';
import IconHome from '../../../../public/icons/dynamic/icon-home.svg';
import IconKebab from '../../../../public/icons/dynamic/icon-kebab.svg';
import IconMapPin1 from '../../../../public/icons/dynamic/icon-map-pin-1.svg';
import IconMapPin2 from '../../../../public/icons/dynamic/icon-map-pin-2.svg';
import IconMessage from '../../../../public/icons/dynamic/icon-message.svg';
import IconPlus from '../../../../public/icons/dynamic/icon-plus.svg';
import IconSearch from '../../../../public/icons/dynamic/icon-search.svg';
import IconSend from '../../../../public/icons/dynamic/icon-send.svg';
import IconSmallX1 from '../../../../public/icons/dynamic/icon-small-x-1.svg';
import IconSmallX2 from '../../../../public/icons/dynamic/icon-small-x-2.svg';
import IconSymbol from '../../../../public/icons/dynamic/icon-symbol.svg';
import IconTag from '../../../../public/icons/dynamic/icon-tag.svg';
import IconUser1 from '../../../../public/icons/dynamic/icon-user-1.svg';
import IconUser2 from '../../../../public/icons/dynamic/icon-user-2.svg';
import IconUsers1 from '../../../../public/icons/dynamic/icon-users-1.svg';
import IconUsers2 from '../../../../public/icons/dynamic/icon-users-2.svg';
import IconX1 from '../../../../public/icons/dynamic/icon-x-1.svg';
import IconX2 from '../../../../public/icons/dynamic/icon-x-2.svg';
import IconBellUnread from '../../../../public/icons/resizable/icon-bell-unread.svg';
import IconCongratulate from '../../../../public/icons/resizable/icon-congratulate.svg';
import IconEmpty from '../../../../public/icons/resizable/icon-empty.svg';
import IconGoogleLogin from '../../../../public/icons/resizable/icon-google-login.svg';
import IconKick from '../../../../public/icons/resizable/icon-kick.svg';
import IconNotFound from '../../../../public/icons/resizable/icon-not-found.svg';
import IconPlusCircle from '../../../../public/icons/resizable/icon-plus-circle.svg';
import IconVisibilityFalse from '../../../../public/icons/resizable/icon-visibility-false.svg';
import IconVisibilityTrue from '../../../../public/icons/resizable/icon-visibility-true.svg';
import IconWegoLogo from '../../../../public/icons/resizable/icon-wego-logo.svg';

type SvgComponent = FC<SVGProps<SVGSVGElement>>;

export const iconComponentMap: Record<string, SvgComponent> = {
  'arrow-down': IconArrowDown,
  'arrow-up': IconArrowUp,
  'bell-read': IconBellRead,
  'calendar-1': IconCalendar1,
  'calendar-2': IconCalendar2,
  check: IconCheck,
  'chevron-left-1': IconChevronLeft1,
  'chevron-left-2': IconChevronLeft2,
  'chevron-right-1': IconChevronRight1,
  clock: IconClock,
  'edit-bar': IconEditBar,
  edit: IconEdit,
  heart: IconHeart,
  home: IconHome,
  kebab: IconKebab,
  'map-pin-1': IconMapPin1,
  'map-pin-2': IconMapPin2,
  message: IconMessage,
  plus: IconPlus,
  search: IconSearch,
  send: IconSend,
  'small-x-1': IconSmallX1,
  'small-x-2': IconSmallX2,
  symbol: IconSymbol,
  tag: IconTag,
  'user-1': IconUser1,
  'user-2': IconUser2,
  'users-1': IconUsers1,
  'users-2': IconUsers2,
  'x-1': IconX1,
  'x-2': IconX2,
  'bell-unread': IconBellUnread,
  congratulate: IconCongratulate,
  empty: IconEmpty,
  'google-login': IconGoogleLogin,
  kick: IconKick,
  'not-found': IconNotFound,
  'plus-circle': IconPlusCircle,
  'visibility-false': IconVisibilityFalse,
  'visibility-true': IconVisibilityTrue,
  'wego-logo': IconWegoLogo,
};
