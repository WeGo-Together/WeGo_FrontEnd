import { cn } from '@/lib/utils';

interface HintProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export const Hint = ({ className, message, ...props }: HintProps) => {
  return (
    <p
      {...props}
      className={cn('text-error-500 text-text-sm-medium w-full px-2 select-none', className)}
      aria-live='polite'
    >
      {message}
    </p>
  );
};
