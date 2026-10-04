import type { CSSProperties, ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import { CloseButton } from "../buttons/CloseButton";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  showCloseButton?: boolean;
};

const sideClasses: Record<DrawerSide, string> = {
  left: "top-0 left-0 h-full w-[min(24rem,calc(100%-2rem))]",
  right: "top-0 right-0 h-full w-[min(24rem,calc(100%-2rem))]",
  top: "top-0 right-0 left-0 max-h-[80vh] w-full",
  bottom: "right-0 bottom-0 left-0 max-h-[80vh] w-full",
};

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  className,
  style,
  showCloseButton = true,
}: DrawerProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[var(--ak-z-overlay)] bg-overlay backdrop-blur-sm" />
        <DialogPrimitive.Content
          style={style}
          className={cn(
            "fixed z-[var(--ak-z-overlay)] flex flex-col border-border bg-surface text-foreground shadow-lg focus:outline-none",
            side === "left" && "border-r",
            side === "right" && "border-l",
            side === "top" && "border-b",
            side === "bottom" && "border-t",
            sideClasses[side],
            className,
          )}
        >
          <div className="flex items-center justify-between gap-2 px-6 py-4">
            {title ? (
              <DialogPrimitive.Title className="text-lg font-semibold">
                {title}
              </DialogPrimitive.Title>
            ) : (
              <span />
            )}
            {showCloseButton ? <CloseButton onClose={onClose} /> : null}
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
