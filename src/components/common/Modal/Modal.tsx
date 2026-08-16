import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ModalProps } from './Modal.types';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = 'basic',
  size = 'md',
  title,
  children,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  preventScroll = false,
  animation = 'scale',
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to handle closing the modal on Escape key press
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  // ✅ Outside click handler (using MouseEvent instead of ChangeEvent)
  const handleOutsideClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        closeOnOutsideClick &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  // ✅ React-friendly escape key handling
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle body scroll
  useEffect(() => {
    if (preventScroll && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, preventScroll]);

  const typeStyles = {
    basic: {
      icon: null,
      headerBg: 'bg-gray-50',
      headerText: 'text-gray-900',
    },
    success: {
      icon: <CheckCircle className='h-6 w-6 text-green-500' />,
      headerBg: 'bg-green-50',
      headerText: 'text-green-900',
    },
    warning: {
      icon: <AlertTriangle className='h-6 w-6 text-yellow-500' />,
      headerBg: 'bg-yellow-50',
      headerText: 'text-yellow-900',
    },
    error: {
      icon: <AlertCircle className='h-6 w-6 text-red-500' />,
      headerBg: 'bg-red-50',
      headerText: 'text-red-900',
    },
    info: {
      icon: <Info className='h-6 w-6 text-blue-500' />,
      headerBg: 'bg-blue-50',
      headerText: 'text-blue-900',
    },
    form: {
      headerBg: 'bg-blue-50',
      headerText: 'text-blue-900',
      icon: '📝',
    },
  }[type];

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    },
    slideDown: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    },
  }[animation];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] p-4 backdrop-blur-sm'
          onClick={handleOutsideClick}
        >
          <motion.div
            ref={modalRef}
            variants={animationVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`w-full ${sizeClasses} rounded-2xl bg-white leading-[24px] shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {title && (
              <div
                className={`px-6 py-4 ${typeStyles.headerBg} rounded-t-2xl border-b border-gray-200`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    {typeStyles.icon && <span>{typeStyles.icon}</span>}
                    {title && (
                      <h3 className={`text-lg font-semibold ${typeStyles.headerText}`}>{title}</h3>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className='ml-2 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200'
                      aria-label='Close modal'
                    >
                      <X className='h-5 w-5 text-gray-500' />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className='px-6 py-6'>{children}</div>

            {/* Footer */}
            {(onConfirm || onCancel) && (
              <div className='flex justify-end space-x-3 rounded-b-2xl border-t border-gray-200 bg-gray-50 px-6 py-4'>
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className='cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
                  >
                    {cancelText}
                  </button>
                )}
                {onConfirm && (
                  <button
                    onClick={onConfirm}
                    className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                      type === 'success'
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                        : type === 'warning'
                          ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                          : type === 'error'
                            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    }`}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
