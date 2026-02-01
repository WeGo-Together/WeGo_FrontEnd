import { cn } from '@/lib/utils';

interface ModalDescriptionProps {
  children: string;
  className?: string;
}

export const ModalDescription = ({ children, className }: ModalDescriptionProps) => {
  return (
    <p id='modal-description' className={cn('text-text-sm-medium text-gray-600', className)}>
      {children}
    </p>
  );
};
