import { cva } from 'class-variance-authority';

import { Icon } from '@/components/icon';

const toastVariants = cva(
  'text-text-sm-semibold flex flex-row items-center gap-2 rounded-2xl px-6 py-3.5',
  {
    variants: {
      type: {
        info: 'text-mono-white bg-[#0D2D3A]/80',
        success: 'text-mono-white bg-[#0D2D3A]/80',
        // error: 'text-mono-white bg-red-600',
        // warning: 'text-mono-white bg-yellow-600',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  },
);

const toastIcons = {
  info: '',
  success: 'congratulate',
  // error: 'alert-circle',
  // warning: 'alert-triangle',
} as const;

interface Props {
  type?: keyof typeof toastIcons;
  children: React.ReactNode;
}

export const Toast = ({ type = 'info', children }: Props) => {
  return (
    <div className={toastVariants({ type })}>
      {toastIcons[type] && <Icon id={toastIcons[type]} className='size-6' />}
      {children}
    </div>
  );
};
