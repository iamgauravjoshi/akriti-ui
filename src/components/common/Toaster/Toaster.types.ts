import type { ReactNode } from 'react';
import type { ModalType } from '../Modal/Modal.types';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastAnimation = 'slide' | 'fade' | 'bounce';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

// Toast Options Interface
export interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
  closable?: boolean;
  pauseOnHover?: boolean;
  showProgress?: boolean;
  closeOnClick?: boolean;
  draggable?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
  onClick?: (toast: Toast) => void;
}

// Toast Interface
export interface Toast {
  id: string;
  options: ToastOptions;
  isExiting: boolean;
}

// Toast Configuration Interface
export interface ToastConfig {
  position: ToastPosition;
  animation: ToastAnimation;
  autoClose: number;
  preventDuplicates: boolean;
  draggable: boolean;
  pauseOnHover: boolean;
}

// Modal Data Interface
export interface ModalData {
  isOpen: boolean;
  title: string;
  type?: ModalType;
  content: ReactNode;
}

// Toast Context Interface
export interface ToastContextValue {
  // State
  toasts: Toast[];
  config: ToastConfig;

  // Toast methods
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;

  success: (title: string, options?: Partial<ToastOptions>) => string;
  error: (title: string, options?: Partial<ToastOptions>) => string;
  warning: (title: string, options?: Partial<ToastOptions>) => string;
  info: (title: string, options?: Partial<ToastOptions>) => string;

  // Modal methods
  showModal: (title: string, content: ReactNode, type?: ModalType) => void;
  closeModal: () => void;

  // Config methods
  updateConfig: (newConfig: Partial<ToastConfig>) => void;
}

// Component Props Interfaces
export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  animation?: ToastAnimation;
  autoClose?: number;
  preventDuplicates?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
}

export interface ToastContainerProps {
  // This component uses context, so no direct props needed
}

export interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}
