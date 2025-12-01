// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// 대표 typography 클래스 (size, line-height, letter-spacing 포함)
const baseTypographyClasses = [
  'display-lg',
  'display-md',
  'display-sm',
  'display-xs',
  'text-xl',
  'text-lg',
  'text-md',
  'text-sm',
  'text-xs',
  'text-2xs',
];

// weight 변형 클래스 (위 속성 + font-weight 포함)
const weightTypographyClasses = [
  'display-lg-regular',
  'display-lg-medium',
  'display-lg-semibold',
  'display-lg-bold',
  'display-md-regular',
  'display-md-medium',
  'display-md-semibold',
  'display-md-bold',
  'display-sm-regular',
  'display-sm-medium',
  'display-sm-semibold',
  'display-sm-bold',
  'display-xs-regular',
  'display-xs-medium',
  'display-xs-semibold',
  'display-xs-bold',
  'text-xl-regular',
  'text-xl-medium',
  'text-xl-semibold',
  'text-xl-bold',
  'text-lg-regular',
  'text-lg-medium',
  'text-lg-semibold',
  'text-lg-bold',
  'text-md-regular',
  'text-md-medium',
  'text-md-semibold',
  'text-md-bold',
  'text-sm-regular',
  'text-sm-medium',
  'text-sm-semibold',
  'text-sm-bold',
  'text-xs-regular',
  'text-xs-medium',
  'text-xs-semibold',
  'text-xs-bold',
  'text-2xs-regular',
  'text-2xs-medium',
  'text-2xs-semibold',
  'text-2xs-bold',
];

// 모든 typography 클래스
const allTypographyClasses = [...baseTypographyClasses, ...weightTypographyClasses];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: allTypographyClasses }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};
