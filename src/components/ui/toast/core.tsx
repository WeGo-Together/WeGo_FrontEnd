import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

interface ToastOption {
  duration?: number;
}

interface ToastContextType {
  run: (toastContent: React.ReactNode, options?: ToastOption) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used in ToastProvider');
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastItem {
  id: string;
  content: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const run = (toastContent: React.ReactNode, options?: ToastOption) => {
    const duration = options?.duration ?? 3000;
    //const toastId = Date.now().toString();
    const toastId = crypto.randomUUID();
    const nextToastContent: ToastItem = {
      id: toastId,
      content: toastContent,
    };
    setToasts((prev) => [...prev, nextToastContent]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, duration);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <ToastContext.Provider value={{ run }}>
      {children}
      {mounted &&
        createPortal(
          <div>
            <AnimatePresence mode='popLayout'>
              {toasts.map((t, i) => {
                const toastIndex = toasts.length - 1 - i;
                return (
                  <div
                    key={t.id}
                    className='pointer-events-none fixed inset-0 z-9999 flex items-end justify-center'
                  >
                    <m.div
                      key={t.id}
                      className='mb-14 w-full max-w-110 px-4'
                      animate={{
                        opacity: toastIndex > 2 ? 0 : 1 - toastIndex * 0.01,
                        y: toastIndex * 10,
                        scale: 1 - toastIndex * 0.05,
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          damping: 19,
                          mass: 1,
                          ease: 'easeOut',
                        },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.2 }, scale: 0.5 }}
                      initial={{ opacity: 0, scale: 0.1 }}
                      role='status'
                    >
                      {t.content}
                    </m.div>
                  </div>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
