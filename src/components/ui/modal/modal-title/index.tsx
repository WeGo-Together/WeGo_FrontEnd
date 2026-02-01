import { cn } from '@/lib/utils';

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalTitle = ({ children, className }: ModalTitleProps) => {
  return (
    <h2 id='modal-title' className={cn('text-text-md-semibold text-gray-800', className)}>
      {children}
    </h2>
  );
};
