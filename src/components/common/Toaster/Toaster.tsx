import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import Modal from '../Modal/Modal';
import type {
  Toast,
  ToastConfig,
  ToastOptions,
  ToastContextValue,
  ToastProviderProps,
  ToastItemProps,
  ModalData,
  ToastType,
  ToastPosition,
} from './Toaster.types';
import './Toaster.scss';
import type { ModalType } from '../Modal/Modal.types';

// Context Creation
const ToastContext = createContext<ToastContextValue | null>(null);

// Custom Hook
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider Component
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  animation = 'slide',
  autoClose = 5000,
  preventDuplicates = false,
  draggable = true,
  pauseOnHover = true,
}) => {
  // State management
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [config, setConfig] = useState<ToastConfig>({
    position,
    animation,
    autoClose,
    preventDuplicates,
    draggable,
    pauseOnHover,
  });
  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    title: '',
    type: 'basic',
    content: '',
  });

  const toastIdRef = useRef<number>(0);

  // ===== CORE TOAST METHODS =====
  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${++toastIdRef.current}`;

      // Prevent duplicates if enabled
      if (config.preventDuplicates) {
        const duplicate = toasts.find(
          (toast) => toast.options.title === options.title && toast.options.type === options.type,
        );
        if (duplicate) return duplicate.id;
      }

      const toast: Toast = {
        id,
        options: {
          duration: config.autoClose,
          pauseOnHover: config.pauseOnHover,
          draggable: config.draggable,
          ...options,
        },
        isExiting: false,
      };

      setToasts((prev) => [toast, ...prev].slice(0, 5)); // Keep max 5 toasts
      return id;
    },
    [toasts, config],
  );

  const removeToast = useCallback((id: string): void => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, isExiting: true } : toast)),
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 350);
  }, []);

  const clearAllToasts = useCallback((): void => {
    setToasts((prev) => prev.map((toast) => ({ ...toast, isExiting: true })));
    setTimeout(() => setToasts([]), 350);
  }, []);

  const success = useCallback(
    (title: string, options: Partial<ToastOptions> = {}): string =>
      addToast({ ...options, type: 'success', title }),
    [addToast],
  );

  const error = useCallback(
    (title: string, options: Partial<ToastOptions> = {}): string =>
      addToast({ ...options, type: 'error', title }),
    [addToast],
  );

  const warning = useCallback(
    (title: string, options: Partial<ToastOptions> = {}): string =>
      addToast({ ...options, type: 'warning', title }),
    [addToast],
  );

  const info = useCallback(
    (title: string, options: Partial<ToastOptions> = {}): string =>
      addToast({ ...options, type: 'info', title }),
    [addToast],
  );

  // ===== MODAL METHODS =====
  const showModal = useCallback((title: string, content: ReactNode, type?: ModalType): void => {
    setModalData({ isOpen: true, title, content, type });
  }, []);

  const closeModal = useCallback((): void => {
    setModalData({ isOpen: false, title: '', content: '' });
  }, []);

  // ===== CONFIG METHODS =====
  const updateConfig = useCallback(
    (newConfig: Partial<ToastConfig>): void => {
      setConfig((prev) => ({ ...prev, ...newConfig }));
      // Clear toasts when visual settings change
      if (newConfig.position || newConfig.animation) {
        clearAllToasts();
      }
    },
    [clearAllToasts],
  );

  // ===== CONTEXT VALUE =====
  const contextValue: ToastContextValue = {
    // State
    toasts,
    config,

    // Toast methods
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,

    // Modal methods
    showModal,
    closeModal,

    // Config methods
    updateConfig,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
      <Modal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        type={modalData.type}
      >
        {modalData.content}
      </Modal>
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer: React.FC = () => {
  const { toasts, config, removeToast } = useToast();

  const getPositionStyles = (): string => {
    const positions: Record<ToastPosition, string> = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };
    return positions[config.position] || positions['top-right'];
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={`iam__toaster fixed z-50 ${getPositionStyles()} pointer-events-none max-h-screen overflow-hidden`}
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      <div className='pointer-events-auto flex flex-col space-y-1'>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
};

// Toast Item Component
const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const { config } = useToast();

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(toast.options.duration ?? 0);
  const dragStartRef = useRef<number | null>(null);

  const {
    type = 'info',
    title,
    description,
    duration,
    closable = true,
    pauseOnHover = config.pauseOnHover,
    showProgress = true,
    closeOnClick = false,
    draggable = config.draggable,
    onClose,
    onClick,
    action,
    icon,
  } = toast.options;

  // Icon mapping
  const getIcon = (): ReactNode => {
    if (icon) return icon;

    const icons: Record<ToastType, ReactNode> = {
      success: (
        <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      ),
      error: (
        <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      ),
      warning: (
        <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
            clipRule='evenodd'
          />
        </svg>
      ),
      info: (
        <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
            clipRule='evenodd'
          />
        </svg>
      ),
    };
    return icons[type];
  };

  const getIconStyles = (): string => {
    const iconStyles: Record<ToastType, string> = {
      success: 'text-green-500 bg-green-50',
      error: 'text-red-500 bg-red-50',
      warning: 'text-amber-500 bg-amber-50',
      info: 'text-blue-500 bg-blue-50',
    };

    return iconStyles[type];
  };

  const getProgressStyles = (): string => {
    const progressStyles: Record<ToastType, string> = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-amber-500',
      info: 'bg-blue-500',
    };
    return progressStyles[type];
  };

  // Animation classes
  const getAnimationClass = (): string => {
    const isExiting = toast.isExiting;
    const animationType = config.animation;

    if (animationType === 'fade') {
      return isExiting ? 'toast-exit-fade' : 'toast-enter-fade';
    } else if (animationType === 'bounce') {
      return isExiting ? 'toast-exit-bounce' : 'toast-enter-bounce';
    } else {
      // Default slide animation
      if (config.position.includes('right')) {
        return isExiting ? 'toast-exit-slide-right' : 'toast-enter-slide-right';
      } else if (config.position.includes('left')) {
        return isExiting ? 'toast-exit-slide-left' : 'toast-enter-slide-left';
      } else if (config.position.includes('top')) {
        return isExiting ? 'toast-exit-slide-top' : 'toast-enter-slide-top';
      } else {
        return isExiting ? 'toast-exit-slide-bottom' : 'toast-enter-slide-bottom';
      }
    }
  };

  // Timer management
  const startTimer = useCallback((): void => {
    if (!duration || duration <= 0) return;

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onRemove(toast.id);
      onClose?.();
    }, remainingTimeRef.current);
  }, [duration, onRemove, toast.id, onClose]);

  const pauseTimer = useCallback((): void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - (startTimeRef.current || 0);
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    }
  }, []);

  const resumeTimer = useCallback((): void => {
    startTimer();
  }, [startTimer]);

  // Drag functionality
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!draggable || toast.isExiting) return;
    setIsDragging(true);
    dragStartRef.current = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    pauseTimer();
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging || !draggable || !dragStartRef.current || toast.isExiting) return;

    const currentX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const offset = currentX - dragStartRef.current;
    setDragOffset(offset);
  };

  const handleDragEnd = (): void => {
    if (!isDragging || !draggable || toast.isExiting) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      onRemove(toast.id);
    } else {
      setDragOffset(0);
      resumeTimer();
    }
  };

  // Progress bar animation
  useEffect(() => {
    if (!showProgress || !duration || duration <= 0) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          const newProgress = Math.max(0, prev - 100 / (duration / 100));
          return newProgress;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration, showProgress, isPaused]);

  // Auto-dismiss timer
  useEffect(() => {
    if (duration && duration > 0) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, startTimer]);

  // Event handlers
  const handleMouseEnter = (): void => {
    if (pauseOnHover && !toast.isExiting) {
      setIsPaused(true);
      pauseTimer();
    }
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover && !toast.isExiting) {
      setIsPaused(false);
      resumeTimer();
    }
  };

  const handleClose = (): void => {
    onRemove(toast.id);
    onClose?.();
  };

  const handleClick = (): void => {
    if (closeOnClick) {
      handleClose();
    }
    onClick?.(toast);
  };

  //   const borderColorClass = `border-l-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'amber' : 'blue'}-500`;

  return (
    <div
      className={`mb-2 border border-gray-200 bg-white shadow-sm ${getAnimationClass()} w-full max-w-sm transform rounded-lg border-l-4 p-4 transition-all duration-200 ease-out hover:shadow-md ${type === 'success' ? 'border-l-green-500' : ''} ${type === 'error' ? 'border-l-red-500' : ''} ${type === 'warning' ? 'border-l-amber-500' : ''} ${type === 'info' ? 'border-l-blue-500' : ''} ${isDragging ? 'scale-105 shadow-lg' : ''} ${isDragging && !toast.isExiting ? 'scale-105 shadow-lg' : ''} sm:max-w-md`}
      style={{
        transform: toast.isExiting
          ? 'none'
          : `translateX(${dragOffset}px) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      role='alert'
      aria-live='polite'
    >
      <div className='flex items-start space-x-3'>
        {/* Icon */}
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${getIconStyles()}`}
        >
          {getIcon()}
        </div>

        {/* Content */}
        <div className='min-w-0 flex-1'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <h4 className='mb-1 text-sm font-medium text-gray-900'>{title}</h4>
              {description && (
                <p className='text-xs leading-relaxed text-gray-600'>{description}</p>
              )}
            </div>

            {/* Close button */}
            {closable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className='ml-3 flex-shrink-0 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
                aria-label='Close notification'
              >
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Action button */}
          {action && <div className='mt-3'>{action}</div>}
        </div>
      </div>

      {/* Progress bar */}
      {showProgress && duration && duration > 0 && (
        <div className='mt-3 h-1 overflow-hidden rounded-full bg-gray-200'>
          <div
            className={`h-full ${getProgressStyles()} rounded-full transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ToastProvider;
