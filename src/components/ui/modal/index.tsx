'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import * as m from 'motion/react-m';

import { Icon } from '@/components/icon';
import { cn } from '@/lib/utils';

interface ModalContextType {
  open: (context: React.ReactNode) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used in ModalProvider');
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const lastInputTypeRef = useRef<'mouse' | 'keyboard'>('mouse');

  const modalWrapperRef = useRef<HTMLDivElement | null>(null);
  const isMouseDownInsideModal = useRef(false);

  const open = (modalContent: React.ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
    if (lastInputTypeRef.current === 'keyboard') {
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else {
      previousFocusRef.current = null;
    }
  };

  const close = () => {
    setContent(null);
    setIsOpen(false);
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  };

  useEffect(() => {
    const handleMouseDown = () => {
      lastInputTypeRef.current = 'mouse';
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') {
        lastInputTypeRef.current = 'keyboard';
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Modal 외부 Mousedown => 내부 MouseUp 일 때 Modal이 닫히지 않음
  // Modal 내부 Mousedown => 외부 MouseUp 일 때 Modal이 닫히지 않음
  // Modal 외부 Mousedown => 외부 Mouseup 일 때 Modal 닫힘
  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (modalWrapperRef.current?.contains(e.target as Node)) {
        isMouseDownInsideModal.current = true;
      } else {
        isMouseDownInsideModal.current = false;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (
        !modalWrapperRef.current?.contains(e.target as Node) &&
        isMouseDownInsideModal.current === false
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  // esc 입력 시 Modal close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  //Modal Open 상태일 시 body scroll 제거
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Modal Open 상태일 때 배경 요소들 무시
  useEffect(() => {
    if (!isOpen) return;
    const appRoot = document.getElementById('root');
    if (appRoot) {
      appRoot.setAttribute('inert', '');
      appRoot.setAttribute('aria-hidden', 'true');
    }
    return () => {
      if (appRoot) {
        appRoot.removeAttribute('inert');
        appRoot.removeAttribute('aria-hidden');
      }
    };
  }, [isOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {mounted &&
        createPortal(
          <div id='modal-root'>
            {isOpen && (
              <m.div
                className='fixed inset-0 z-9999 flex items-center justify-center bg-black/50'
                animate={{
                  opacity: 1,
                }}
                aria-describedby='modal-description'
                aria-labelledby='modal-title'
                aria-modal='true'
                initial={{ opacity: 0 }}
                role='dialog'
              >
                <div ref={modalWrapperRef} className='flex w-full max-w-110 justify-center px-4'>
                  {content}
                </div>
              </m.div>
            )}
          </div>,
          document.body,
        )}
    </ModalContext.Provider>
  );
};

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // focus 처리
  useEffect(() => {
    if (!modalRef.current) return;

    const modal = modalRef.current;
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
  }, [children]);

  return (
    <m.div
      ref={modalRef}
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

interface ModalTitleProps {
  children: string;
  className?: string;
}

export const ModalTitle = ({ children, className }: ModalTitleProps) => {
  return (
    <h2 id='modal-title' className={cn('text-text-md-semibold text-gray-800', className)}>
      {children}
    </h2>
  );
};

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

export const ModalCloseButton = () => {
  const { close } = useModal();
  return (
    <button
      className='absolute top-0 right-0 rounded-sm transition-colors duration-300 hover:bg-gray-200 active:bg-gray-200'
      aria-label='모달 닫기'
      type='button'
      onClick={close}
    >
      <Icon id='x-1' className='size-5 cursor-pointer text-gray-500' />
    </button>
  );
};
