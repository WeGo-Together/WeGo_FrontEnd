import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'flex items-center justify-center whitespace-nowrap rounded-full border border-gray-300 bg-gray-100 text-gray-700',
  {
    variants: {
      variant: {
        sm: 'h-[18px] w-[42px] px-2 py-0.5 text-text-2xs-medium',
        md: 'h-[26px] w-[52px] px-2.5 py-1 text-text-xs-medium',
      },
    },
    defaultVariants: {
      variant: 'sm',
    },
  },
);

interface PendingBadgeProps {
  children: React.ReactNode;
  variant?: 'sm' | 'md';
  className?: string;
}

export const PendingBadge = ({ children, variant = 'sm', className }: PendingBadgeProps) => {
  return <div className={cn(badgeVariants({ variant }), className)}>{children}</div>;
};
