import type { CSSProperties, ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../buttons/Button";
import { CloseButton } from "../buttons/CloseButton";
import type { Size } from "../../types/common";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogOverlay({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-[var(--ak-z-overlay)] bg-overlay backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        className,
      )}
    />
  );
}

export type DialogContentProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: Extract<Size, "sm" | "md" | "lg" | "xl">;
};

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function DialogContent({
  children,
  className,
  style,
  size = "md",
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        style={style}
        className={cn(
          "fixed top-1/2 left-1/2 z-[var(--ak-z-overlay)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
          "rounded-xl border border-border bg-surface p-0 text-foreground shadow-lg",
          "focus:outline-none",
          sizeClasses[size],
          className,
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export type ModalType = "basic" | "success" | "warning" | "error" | "info" | "form";
export type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type?: ModalType;
  size?: ModalSize;
  title?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const typeMeta: Record<
  ModalType,
  { icon: ReactNode; header: string; intent: "default" | "success" | "warning" | "danger" | "info" }
> = {
  basic: { icon: null, header: "bg-muted text-foreground", intent: "default" },
  success: {
    icon: <CheckCircle className="h-5 w-5 text-success" />,
    header: "bg-success-subtle text-success",
    intent: "success",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-warning" />,
    header: "bg-warning-subtle text-warning",
    intent: "warning",
  },
  error: {
    icon: <AlertCircle className="h-5 w-5 text-danger" />,
    header: "bg-danger-subtle text-danger",
    intent: "danger",
  },
  info: {
    icon: <Info className="h-5 w-5 text-info" />,
    header: "bg-info-subtle text-info",
    intent: "info",
  },
  form: {
    icon: <Info className="h-5 w-5 text-primary" />,
    header: "bg-muted text-foreground",
    intent: "default",
  },
};

export function Modal({
  isOpen,
  onClose,
  type = "basic",
  size = "md",
  title,
  children,
  className,
  style,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) {
  const meta = typeMeta[type];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[var(--ak-z-overlay)] bg-overlay backdrop-blur-sm" />
        <DialogPrimitive.Content
          style={style}
          onEscapeKeyDown={(event) => {
            if (!closeOnEscape) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (!closeOnOutsideClick) event.preventDefault();
          }}
          className={cn(
            "fixed top-1/2 left-1/2 z-[var(--ak-z-overlay)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
            "overflow-hidden rounded-xl border border-border bg-surface text-foreground shadow-lg focus:outline-none",
            sizeClasses[size],
            className,
          )}
        >
          {title ? (
            <div className={cn("flex items-center justify-between border-b border-border px-6 py-4", meta.header)}>
              <div className="flex items-center gap-3">
                {meta.icon}
                <DialogPrimitive.Title className="text-lg font-semibold">
                  {title}
                </DialogPrimitive.Title>
              </div>
              {showCloseButton ? <CloseButton onClose={onClose} /> : null}
            </div>
          ) : showCloseButton ? (
            <div className="flex justify-end p-3">
              <CloseButton onClose={onClose} />
            </div>
          ) : null}

          <div className="px-6 py-6">{children}</div>

          {onConfirm || onCancel ? (
            <div className="flex justify-end gap-3 border-t border-border bg-muted px-6 py-4">
              {onCancel ? (
                <Button variant="outline" onClick={onCancel}>
                  {cancelText}
                </Button>
              ) : null}
              {onConfirm ? (
                <Button intent={meta.intent} onClick={() => void onConfirm()}>
                  {confirmText}
                </Button>
              ) : null}
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}
