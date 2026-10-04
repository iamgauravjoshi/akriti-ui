import type { CSSProperties, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/cn";

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  style?: CSSProperties;
};

export function Popover({
  trigger,
  children,
  open,
  defaultOpen,
  onOpenChange,
  side = "bottom",
  align = "center",
  className,
  style,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={8}
          style={style}
          className={cn(
            "z-[var(--ak-z-overlay)] w-72 rounded-lg border border-border bg-surface p-4 text-foreground shadow-lg focus:outline-none",
            className,
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
