import React from 'react';

export type ModalType = 'basic' | 'success' | 'warning' | 'error' | 'form';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export type ModalAnimation = 'fade' | 'scale' | 'slideUp' | 'slideDown';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: ModalType;
  size?: ModalSize;
  title?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;
  animation?: ModalAnimation;
  onConfirm?: (data: any) => Promise<void> | void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}
