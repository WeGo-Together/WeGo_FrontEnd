import { cva, VariantProps } from 'class-variance-authority';

import { Icon } from '@/components/icon';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'text-text-sm-semibold flex flex-row items-center gap-2 rounded-2xl px-6 py-3.5',
  {
    variants: {
      type: {
        info: 'text-mono-white bg-[#0D2D3A]/80 justify-center',
        success: 'text-mono-white bg-[#0D2D3A]/80 justify-start',
        // error: 'text-mono-white bg-red-600',
        // warning: 'text-mono-white bg-yellow-600',
      },
      offset: {
        default: 'mb-4',
        button: 'mb-21',
      },
    },
    defaultVariants: {
      type: 'info',
      offset: 'default',
    },
  },
);

const toastIcons = {
  info: '',
  success: 'congratulate',
  // error: 'alert-circle',
  // warning: 'alert-triangle',
} as const;

interface Props extends VariantProps<typeof toastVariants> {
  className?: string;
  children: React.ReactNode;
}

export const Toast = ({ type, offset, className, children }: Props) => {
  const iconId = type && toastIcons[type as keyof typeof toastIcons];
  return (
    <div className={cn(toastVariants({ type, offset }), className)}>
      {iconId && <Icon id={iconId} className='size-6' />}
      {children}
    </div>
  );
};
