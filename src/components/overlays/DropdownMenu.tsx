import {
  forwardRef,
  type ComponentProps,
} from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof DropdownMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn("focus-visible:outline-none", className)}
    {...props}
  />
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-[var(--ak-z-overlay)] min-w-44 overflow-hidden rounded-lg border border-border bg-surface p-1 text-foreground shadow-lg focus:outline-none",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm",
      "hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2.5 py-1.5 text-xs font-medium text-muted-foreground",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 border-t border-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export function DropdownMenuCheckItem({
  checked,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      checked={checked}
      {...props}
    >
      <span className="flex w-4 items-center justify-center" aria-hidden>
        {checked ? <Check size={14} /> : null}
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}
