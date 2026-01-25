import { useEffect } from 'react';

import * as m from 'motion/react-m';

import { cn } from '@/lib/utils';

import { ModalCloseButton } from '../modal-close-button';
import { useModal } from '../modal-provider';

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
  const { modalContentRef } = useModal();

  // focus trap 처리
  useEffect(() => {
    if (!modalContentRef.current) return;

    const modal = modalContentRef.current;
    const focusableElements = modal.querySelectorAll(
      'button:not([disabled]), a[href]:not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
  }, [children, modalContentRef]);

  return (
    <m.div
      ref={modalContentRef}
      className={cn('w-full rounded-3xl bg-white p-5', className)}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      initial={{ opacity: 0, scale: 0.1 }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className='relative'>
        {children}
        <ModalCloseButton />
      </div>
    </m.div>
  );
};
